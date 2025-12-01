import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import { 
  sendEmail, 
  bookingConfirmationEmail, 
  bookingConfirmedEmail, 
  bookingCancelledEmail,
  adminNewBookingEmail,
  welcomeEmail 
} from "./email.tsx";

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
    
    // Wysyłanie emaili (nie blokujemy odpowiedzi jeśli email się nie wyśle)
    try {
      // Email do klienta - potwierdzenie otrzymania rezerwacji
      await sendEmail({
        to: user.email!,
        subject: '✨ Rezerwacja przyjęta - Bozemski.pl',
        html: bookingConfirmationEmail({
          userName: booking.user_name,
          date: booking.date,
          serviceType: booking.serviceType,
          note: booking.note,
        }),
      });

      // Email do admina - powiadomienie o nowej rezerwacji
      const ADMIN_EMAILS = ["wojciech@bozemski.pl", "patryk.siwkens@gmail.com"];
      for (const adminEmail of ADMIN_EMAILS) {
        await sendEmail({
          to: adminEmail,
          subject: `🔔 Nowa rezerwacja od ${booking.user_name}`,
          html: adminNewBookingEmail({
            userName: booking.user_name,
            userEmail: booking.user_email,
            date: booking.date,
            serviceType: booking.serviceType,
            note: booking.note,
          }),
        });
      }
    } catch (emailError) {
      // Logujemy błąd, ale nie przerywamy procesu
      console.error('Błąd wysyłania emaili:', emailError);
    }
    
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
    const ADMIN_EMAILS = ["wojciech@bozemski.pl", "patryk.siwkens@gmail.com"];
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
    
    const ADMIN_EMAILS = ["wojciech@bozemski.pl", "patryk.siwkens@gmail.com"];
    const isAdmin = user.email && ADMIN_EMAILS.includes(user.email);
    if (!isAdmin) return c.json({ error: "Forbidden" }, 403);

    const id = c.req.param('id');
    const { status } = await c.req.json();
    
    const booking = await kv.get(`booking_${id}`);
    if (!booking) return c.json({ error: "Not found" }, 404);
    
    const oldStatus = booking.status;
    booking.status = status;
    await kv.set(`booking_${id}`, booking);
    
    // Wysyłanie emaili przy zmianie statusu (tylko jeśli status się zmienił)
    if (oldStatus !== status && booking.user_email) {
      try {
        if (status === 'confirmed') {
          // Email do klienta - rezerwacja potwierdzona
          await sendEmail({
            to: booking.user_email,
            subject: '✅ Rezerwacja potwierdzona - Bozemski.pl',
            html: bookingConfirmedEmail({
              userName: booking.user_name,
              date: booking.date,
              serviceType: booking.serviceType,
            }),
          });
        } else if (status === 'cancelled') {
          // Email do klienta - rezerwacja anulowana
          await sendEmail({
            to: booking.user_email,
            subject: '❌ Rezerwacja anulowana - Bozemski.pl',
            html: bookingCancelledEmail({
              userName: booking.user_name,
              date: booking.date,
              serviceType: booking.serviceType,
            }),
          });
        }
      } catch (emailError) {
        // Logujemy błąd, ale nie przerywamy procesu
        console.error('Błąd wysyłania emaila:', emailError);
      }
    }
    
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

    // Wysyłanie emaila powitalnego (nie blokujemy odpowiedzi jeśli email się nie wyśle)
    try {
      const userName = data?.name || email.split('@')[0];
      await sendEmail({
        to: email,
        subject: '✨ Witamy w Bozemski.pl!',
        html: welcomeEmail(userName, email),
      });
    } catch (emailError) {
      // Logujemy błąd, ale nie przerywamy procesu
      console.error('Błąd wysyłania emaila powitalnego:', emailError);
    }

    return c.json(user);
  } catch (e) {
    console.error("Signup exception:", e);
    return c.json({ error: e.message }, 500);
  }
});

Deno.serve(app.fetch);