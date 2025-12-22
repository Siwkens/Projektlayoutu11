import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Middleware to check for authorization header on Supabase Edge Functions
app.use('/make-server-139d10cf/*', async (c, next) => {
  const authHeader = c.req.header('Authorization');
  
  // Log all headers for debugging
  console.log('📨 Incoming request to:', c.req.path);
  console.log('🔑 Authorization header present:', !!authHeader);
  
  // For public endpoints (health, init-admin, create-admin, signup), skip auth check
  const publicEndpoints = [
    '/make-server-139d10cf/health',
    '/make-server-139d10cf/init-admin',
    '/make-server-139d10cf/create-admin',
    '/make-server-139d10cf/signup'
  ];
  
  if (publicEndpoints.includes(c.req.path)) {
    console.log('✅ Public endpoint - skipping auth check');
    return await next();
  }
  
  // For protected endpoints, require auth
  if (!authHeader) {
    console.error('❌ Missing authorization header for protected endpoint');
    return c.json({ 
      code: 401,
      message: "Missing authorization header" 
    }, 401);
  }
  
  return await next();
});

// Helper to get user from token
const getUser = async (req: Request) => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return null;
  
  const token = authHeader.split(' ')[1];
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  );
  const { data: { user }, error } = await supabase.auth.getUser(token);
  return user;
}

// Health check endpoint
app.get("/make-server-139d10cf/health", (c) => {
  return c.json({ status: "ok" });
});

// --- Booking Routes ---

// Create Booking
app.post("/make-server-139d10cf/bookings", async (c) => {
  try {
    const user = await getUser(c.req.raw);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const body = await c.req.json();
    const id = crypto.randomUUID();
    
    // Basic validation
    if (!body.date || !body.serviceType) {
      return c.json({ error: "Missing fields" }, 400);
    }

    const booking = {
      id,
      user_id: user.id,
      user_email: user.email,
      user_name: user.user_metadata?.name || user.email,
      date: body.date, // ISO string
      serviceType: body.serviceType,
      note: body.note || "",
      status: 'pending', // pending, confirmed, cancelled
      created_at: new Date().toISOString(),
    };
    
    await kv.set(`booking_${id}`, booking);
    return c.json(booking);
  } catch (e) {
    console.error("Booking create error:", e);
    return c.json({ error: e.message }, 500);
  }
});

// Get Bookings (User sees own, Admin sees all)
app.get("/make-server-139d10cf/bookings", async (c) => {
  try {
    const user = await getUser(c.req.raw);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const bookings = await kv.getByPrefix("booking_");
    
    // Admin Check
    const ADMIN_EMAILS = ["wojciech@bozemski.pl", "patryk.siwkens@gmail.com", "admin@test.pl"];
    const isAdmin = user.email && ADMIN_EMAILS.includes(user.email);
    
    if (isAdmin) {
      // Sort by date descending
      return c.json(bookings.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } else {
      const userBookings = bookings.filter((b: any) => b.user_id === user.id);
      return c.json(userBookings.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  } catch (e) {
    console.error("Get bookings error:", e);
    return c.json({ error: e.message }, 500);
  }
});

// Update Booking Status (Admin Only)
app.patch("/make-server-139d10cf/bookings/:id", async (c) => {
  try {
    const user = await getUser(c.req.raw);
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    
    const ADMIN_EMAILS = ["wojciech@bozemski.pl", "patryk.siwkens@gmail.com", "admin@test.pl"];
    const isAdmin = user.email && ADMIN_EMAILS.includes(user.email);
    if (!isAdmin) return c.json({ error: "Forbidden" }, 403);

    const id = c.req.param('id');
    const { status } = await c.req.json();
    
    const booking = await kv.get(`booking_${id}`);
    if (!booking) return c.json({ error: "Not found" }, 404);
    
    booking.status = status;
    await kv.set(`booking_${id}`, booking);
    
    return c.json(booking);
  } catch (e) {
    console.error("Update booking error:", e);
    return c.json({ error: e.message }, 500);
  }
});

// Sign Up Route (Auto-confirm)
app.post("/make-server-139d10cf/signup", async (c) => {
  try {
    const { email, password, data } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: user, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: data || {},
      email_confirm: true // Auto confirm
    });

    if (error) {
      console.error("Signup error:", error);
      return c.json({ error: error.message }, 400);
    }

    return c.json(user);
  } catch (e) {
    console.error("Signup exception:", e);
    return c.json({ error: e.message }, 500);
  }
});

// Initialize Admin Account (for development/testing)
app.post("/make-server-139d10cf/init-admin", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Admin credentials
    const adminEmail = "admin@test.pl";
    const adminPassword = "Admin123!";

    // Check if admin already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const adminExists = existingUsers?.users.some(u => u.email === adminEmail);

    if (adminExists) {
      return c.json({ 
        message: "Konto administratora już istnieje", 
        email: adminEmail,
        alreadyExists: true 
      });
    }

    // Create admin user
    const { data: user, error } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      user_metadata: { 
        name: "Administrator",
        role: "admin" 
      },
      email_confirm: true
    });

    if (error) {
      console.error("Admin init error:", error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      message: "Konto administratora zostało utworzone",
      email: adminEmail,
      password: adminPassword,
      info: "UWAGA: Zmień hasło po pierwszym logowaniu!"
    });
  } catch (e) {
    console.error("Admin init exception:", e);
    return c.json({ error: e.message }, 500);
  }
});

// Create Admin Account (flexible endpoint)
app.post("/make-server-139d10cf/create-admin", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    console.log('🔧 Otrzymano żądanie utworzenia admina:', { email, name });
    
    if (!email || !password) {
      console.error('❌ Brak emaila lub hasła');
      return c.json({ error: "Email i hasło są wymagane" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    console.log('📋 Sprawdzanie czy użytkownik już istnieje...');
    
    // Check if user already exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('❌ Błąd podczas sprawdzania użytkowników:', listError);
      return c.json({ error: listError.message }, 500);
    }
    
    const userExists = existingUsers?.users.some(u => u.email === email);

    if (userExists) {
      console.log('✅ Użytkownik już istnieje:', email);
      return c.json({ 
        message: "Konto administratora już istnieje", 
        email: email,
        alreadyExists: true 
      });
    }

    console.log('➕ Tworzenie nowego użytkownika administratora...');
    
    // Create admin user
    const { data: user, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name: name || "Administrator",
        role: "admin" 
      },
      email_confirm: true
    });

    if (error) {
      console.error("❌ Admin create error:", error);
      return c.json({ error: error.message }, 400);
    }

    console.log('✅ Użytkownik utworzony pomyślnie:', user?.id);

    return c.json({ 
      message: "Konto administratora zostało utworzone pomyślnie",
      email: email,
      password: password,
      userId: user?.id,
      info: "UWAGA: Zapisz hasło i zmień je po pierwszym logowaniu!"
    });
  } catch (e) {
    console.error("❌ Admin create exception:", e);
    return c.json({ error: e.message }, 500);
  }
});

Deno.serve(app.fetch);