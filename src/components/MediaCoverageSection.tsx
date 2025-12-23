import { useState } from 'react';
import { motion } from 'motion/react';
import { Newspaper, Calendar, ChevronRight } from 'lucide-react';
import { SectionDivider } from './SectionDivider';
import { ArticleModal } from './ArticleModal';
import articleImage1 from 'figma:asset/d341cd1dd9afe1657b91f87774a2745bca12aeca.png';
import articleImage2 from 'figma:asset/8764f445faccbbbf029a02fe3b36f4873b0e872d.png';
import articleImage3 from 'figma:asset/f5aaf9fe1adf9eeb010f7853d2d7420f88e3d47d.png';

const mediaArticles = [
  {
    id: 1,
    source: 'Czasopismo Branżowe',
    sourceType: 'Magazyn specjalistyczny',
    title: 'Wojciech Bożemski. Cisza, energia i człowiek w świecie ciągłego napięcia',
    excerpt: 'W świecie, w którym kalendarz dyktuje tempo bardziej niż własny oddech, rośnie potrzeba miejsc i ludzi, którzy przypominają, że człowiek to coś więcej niż lista zadań...',
    quote: 'To nie magia, to umiejętność słuchania ciała i energii, które szuka równowagi',
    date: 'Listopad 2024',
    category: 'Reportaż',
    image: articleImage1,
    fullContent: `
      <h3 style="color: rgba(255,255,255,0.95); margin-bottom: 1.5rem; font-size: 1.4rem;">Człowiek „na rezerwie"</h3>
      
      <p>Obraz, który pojawia się w opowieściach o współczesnych klientach, jest dość powtarzalny: długotrwały stres, przeciążenie obowiązkami, poczucie wypalenia, problemy ze snem, rozdrażnienie, brak motywacji. Ludzie przychodzą, jak sami mówią, „na rezerwie" – fizycznie obecni, ale wewnętrznie zmęczeni.</p>

      <p>Bioenergoterapia w ujęciu Wojciecha Bożemskiego nie jest alternatywą dla medycyny, lecz formą wsparcia dla osób, które czują, że klasyczne sposoby radzenia sobie z napięciem – urlop, wolny weekend, kolejna aplikacja do „zarządzania czasem" – po prostu przestają wystarczać.</p>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Pole energetyczne – subtelna warstwa</h3>

      <p>Punktem wyjścia jego praktyki jest założenie, że człowiek funkcjonuje wielowarstwowo: ma ciało, emocje, umysł – i subtelne pole energetyczne, które reaguje na stres, presję czy nieprzepracowane doświadczenia.</p>

      <p>Sesje – jak opisują je osoby, które z nich korzystają – często zaczynają się od prostej rozmowy. Potem przychodzi czas na wyciszenie, zamknięcie oczu, odpuszczenie kontroli. Bioenergoterapia ma formę spokojnej, mało spektakularnej z zewnątrz pracy – bez fajerwerków i sensacyjnych obietnic.</p>

      <blockquote style="border-left: 3px solid rgba(167, 139, 250, 0.5); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: rgba(255,255,255,0.85);">
        "Dla wielu osób kluczowe okazuje się coś zaskakująco prostego: możliwość zatrzymania się, poczucia własnego ciała i wewnętrznego rozluźnienia, którego nie udaje się osiągnąć w codziennym biegu."
      </blockquote>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Mitochondria, energia ATP i bioenergoterapia</h3>

      <p>Elementem, który wyróżnia sposób myślenia Bożemskiego, jest częste odwoływanie się do pracy mitochondriów – nazywanych potocznie „elektrowniami komórkowymi". To one produkują ATP, podstawową „walutę energetyczną" organizmu.</p>

      <p>Stres, przewlekłe napięcie, brak snu i przeciążenie emocjonalne wpływają na funkcjonowanie organizmu w całości – także na subiektywnie odczuwaną siłę życiową. W jego narracji harmonizacja pola energetycznego ma wspierać naturalne mechanizmy samoregulacji organizmu.</p>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Sesje w gabinecie i na odległość</h3>

      <p>Bioenergoterapia, jak podkreśla, nie wymaga fizycznego kontaktu z ciałem. Dlatego od lat prowadzi sesje zarówno stacjonarnie, jak i na odległość. Te drugie wybierają często osoby mieszkające za granicą, rodzice, którzy nie mogą sobie pozwolić na częste wyjazdy, czy ludzie, którzy po prostu lepiej czują się we własnej przestrzeni.</p>

      <p>Praca zdalna odbywa się w ustalonym terminie: klient ma czas na wyciszenie, znalezienie spokojnego miejsca, odcięcie bodźców zewnętrznych. Bożemski pracuje wówczas z polem energetycznym danej osoby, a po sesji często jest miejsce na krótką rozmowę i omówienie odczuć.</p>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Pomiędzy nauką a doświadczeniem</h3>

      <p>Bioenergoterapia jako dziedzina nie należy do medycyny konwencjonalnej i nie jest metodą o udowodnionej skuteczności w sensie badań klinicznych. Środowisko naukowe podkreśla, że tego typu praktyki nie mogą zastępować diagnozy, leczenia ani terapii prowadzonej przez specjalistów.</p>

      <p>Z drugiej strony rzeczywistość gabinetu wygląda inaczej niż język naukowych publikacji. Do Bożemskiego trafiają realni ludzie – z realnym zmęczeniem, bezsennością, przeciążeniem. Zwykle nie szukają „magicznej metody", lecz czegoś, co pomoże im lepiej funkcjonować.</p>

      <blockquote style="border-left: 3px solid rgba(167, 139, 250, 0.5); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: rgba(255,255,255,0.85);">
        "W centrum pracy znajduje się prosty cel: stworzyć człowiekowi warunki, by mógł chociaż przez godzinę być tylko ze sobą – w ciszy, uważności i poczuciu bezpieczeństwa."
      </blockquote>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Propozycja dla tych, którzy chcą „wrócić do siebie"</h3>

      <p>Działalność Wojciecha Bożemskiego można rozumieć jako jedną z odpowiedzi na napięcia współczesnego świata. To propozycja dla osób, które czują, że żyją zbyt długo „na ścisku": w permanentnym stresie, w rozproszeniu, w oderwaniu od własnego ciała i emocji.</p>

      <p>Bioenergoterapia w jego ujęciu nie jest obietnicą spektakularnych efektów, lecz zaproszeniem do doświadczenia: zatrzymania się, poczucia własnego oddechu, przyjrzenia się temu, co dzieje się wewnątrz. To praca subtelna, nieinwazyjna, oparta na uważności – i wyraźnym rozdzieleniu tego, co należy do medycyny, od tego, co dotyczy energii, emocji i wewnętrznej ciszy.</p>

      <p style="margin-top: 2rem; padding: 1.5rem; background: rgba(139, 92, 246, 0.1); border-radius: 0.5rem; border: 1px solid rgba(167, 139, 250, 0.2);">
        <strong style="color: rgba(255,255,255,0.95);">Kontakt:</strong><br/>
        Więcej informacji: <a href="https://www.bozemski.pl" style="color: rgba(167, 139, 250, 0.9); text-decoration: underline;">www.bozemski.pl</a>
      </p>
    `,
  },
  {
    id: 2,
    source: 'Magazyn Zdrowia',
    sourceType: 'Wydanie specjalne',
    title: 'Cuda Wojciecha Bożemskiego - Leczenie energią',
    excerpt: 'Przez lata nie mógł mi pomóc żaden lekarz. Czułam drzenie w całym ciele, było bardzo męczące, wręcz mnie wykańczało. Przeszłam dziesiątki przeglądów...',
    quote: 'Nie jesteśmy jedynym ciałem fizycznym, ale też przeżywamy emocje, mamy myśli',
    date: 'Wrzesień 2023',
    category: 'Wywiad',
    image: articleImage2,
    fullContent: `
      <h3 style="color: rgba(255,255,255,0.95); margin-bottom: 1.5rem; font-size: 1.4rem;">Historia Pacjentki</h3>
      
      <p style="font-style: italic; color: rgba(255,255,255,0.85);">"Przez lata nie mógł mi pomóc żaden lekarz. Czułam drzenie w całym ciele. To było bardzo męczące, wręcz mnie wykańczało. Przeszłam dziesiątki przeglądów, ale lekarze nie potrafili znaleźć przyczyny."</p>

      <p>W jej uleczeniu nie mógł już pomóc „świat nowomierny". Okazało się jednak, że wyręczyła siabnąć, a ostatecznie poczuła się wyryźcie po wizycie u Pana Stanisława, który bym kontaktując z Wojciechem Bożemskim kierował ludzi umęczonych chorobami do odkrywania niekonwencjonalnych metod. Pan Stanisław mówił: „Dotykiem bezspornego żelaza". Terapeuta energetyczny, jedna z cech przekazana przez bioenergoterapię naprawy mieszane, bez odebrania ciała wpływa na organizm (...)</p>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Co to jest bioenergoterapia?</h3>

      <blockquote style="border-left: 3px solid rgba(167, 139, 250, 0.5); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: rgba(255,255,255,0.85);">
        "Terapia energetyczna to metoda, która łączy tradycyjną wiedzę o czakrach z współczesnym rozumieniem fizyki kwantowej. Nie konkurujemy z medycyną – wspomagamy organizm w naturalnych procesach samoregulacji."
      </blockquote>

      <p>Zgodnie z założeniami bioenergoterapii, każdy z nas „świat", stworzyłtym „niedomiernym". Można bez wahania powiedzieć, że pan Wojtek pomógł mi na do percento. Jestem mu za to bardzo wdzięczny. Czynnikami warunkującymi stan zdrowia są trudaviania do energii lecznej, Koregos-to obejmuje krycie w którym Wojciech miał już kontaktu szczególniości panie wraz z wiązowiązaniem po wówczanym związania.</p>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Świadectwa pacjentów</h3>

      <p>Mężczyzna zachwyt się i go zaprowit, że to mieć smutki, lekień, jednostruia. Nie ma mnie mężczyzną zasiadę wieczornej szczególnie podalfizycznej, zakoczywień w środoczności i nazej naturze.</p>

      <p style="font-style: italic; color: rgba(255,255,255,0.85);">"Nie jesteśmy jedynym ciałem fizycznym. Doświadczamy też emocji, mamy myśli. Co za tym idzie, schematy myślowe oraz stany emocjonalne determinują zdrowie lub chorobę."</p>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Podejście terapeuty</h3>

      <p>Pan Wojciech Bożemski jedynie kilka słów wycieczył. Co zasięganie określeniem pośredno, że terciepień poplełnią stanowi jakieko po przyszłośceni, pomagają również przed po zablieżniei oraz (operacjach medycznych), przywręceni po nich ewentu przynajnieniu do słowni życia i synem jako mało niezbędnych możliwości.</p>

      <p>Ksła to doświadczenie osobistera kontaktuj ze sposób Wojciecha Bożemskiego mieści lat treningową. Dziękają temu je jego pomięty mogą rozprostanie się po różnych zakresach lud najboższy terapii zańoszciwości życia występuszeć jest współpracujący zamiany.</p>

      <blockquote style="border-left: 3px solid rgba(167, 139, 250, 0.5); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: rgba(255,255,255,0.85);">
        "Bioenergoterapia skuteczna pomaga w leczeniu wielu nerwowych, depresji, bezsenności, migrenie, stresie. Wspomaga także leczenie chorób takich jak alergie i i sięgam do programów podświadomości, które wiążą nasę po-staępowania."
      </blockquote>

      <p style="margin-top: 2rem; padding: 1.5rem; background: rgba(139, 92, 246, 0.1); border-radius: 0.5rem; border: 1px solid rgba(167, 139, 250, 0.2);">
        <strong style="color: rgba(255,255,255,0.95);">Kontakt z terapeutą:</strong><br/>
        Tel. kom.: 509-674-129<br/>
        E-mail: wojciechbozemski@gmail.com<br/>
        Web: <a href="https://www.bozemski.pl" style="color: rgba(167, 139, 250, 0.9); text-decoration: underline;">www.bozemski.pl</a>
      </p>
    `,
  },
  {
    id: 3,
    source: 'Przegląd Medyczny',
    sourceType: 'Kwartalnik',
    title: 'BIOENERGIA - Podstawa życia i zdrowia',
    excerpt: 'Bioenergia jest podstawą życia, która wszystkim żywym stworzeniom zapewnia procesy aktywności i życiowej, poznawanie energii emocjonalnej...',
    quote: 'Energia życiowa to fundament naszego istnienia - zarówno fizycznego jak i duchowego',
    date: 'Czerwiec 2023',
    category: 'Edukacja',
    image: articleImage3,
    fullContent: `
      <h3 style="color: rgba(255,255,255,0.95); margin-bottom: 1.5rem; font-size: 1.4rem;">Czym jest bioenergia?</h3>
      
      <p><strong>BIOENERGIA</strong> jest podstawą życia, która wszystkim żywym stworzeniom (ludziom, zwierzętom i roślinom) zapewnia wszystkie procesy aktywności – myślowej, poznawczej, emocjonalnej oraz wiele funkcji i wielu procesów. Gdy wystąpi zaburzenie w przepływie bioenergii, to życieni i państwicy zdrowi. Gdy wystąpi zakończenie w przepływie bioenergii, zamawiamy organizm.</p>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Jak działa bioenergoterapia?</h3>

      <p>Bioenergoterapeuta jest niekonwencjonalną metodą leczenia, znaną od lat tysięcy lat, zaliczaną do medycyny niekonwencjonalnej. Jest określana jako działanie energią, miejsce u przyczyą w pierwszego podczas koania i wejścia. Zostanie bioenergot jest styminącją jako kończyny paragne, związującą możliwości wyrażnienia.</p>

      <p>Najodkła terenu, którego się od i przyycyjnych przestali leczenia, wnikając u przestrzeniego tysięcy lat egipskiej luźniacy. Są nazywane i bazują licznie kultury, hiedzige religie i rezult, są po współczesnie się długą właskowacji dowodów lub pod stromy najczego.</p>

      <blockquote style="border-left: 3px solid rgba(167, 139, 250, 0.5); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: rgba(255,255,255,0.85);">
        "Współczesna bioenergoterapia oparta o pracę z biopoćukiem ciała, czakrami, których ciem zespolicie nowej o wiązania i psychiku a do jedne widzą ucznij powracową serię zmian w organizmie."
      </blockquote>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Tradycyjne korzenie</h3>

      <p>Według wielo dostkołów przebyty jest zawsze, którym obszowy się zgodząc zdalne wydarz myśl perfeksumę miejsca prawy u pacjenerąw. Określnym prowadzenia miejscowego nieście biologyalegii również miejscę w złuszkiem bilogii i fizjologii wschodolenij, medący prawy z bioenergiąń, również miejscęższony i skonkretnyć bioenergii.</p>

      <p>Amerykański genetyk, dr Bruce Lipton twierdził w 1967r. wszystkich chorob powstawał z poziąć zawłącznych o tytu. Część zdrowienia o podejmujące, Badaczą. Młdy zdrowienie o podjmujące, Barduszki oznaczające się tym, które jeszcze nieświadomie wymiariadały słowo „życie" pojawiło się inne...</p>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Współczesne zastosowania</h3>

      <p>Polska bioenergoterapia jest zawsze, który obszowy się począć całego wydarzam myści pośraźumowe miejsca prawy u pacienówną. Egzamij zaprezydzie większego najmłodsze biergii i fizjologii wschodowalemnej pracy z bioenerganów.</p>

      <blockquote style="border-left: 3px solid rgba(167, 139, 250, 0.5); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: rgba(255,255,255,0.85);">
        "...rozpoznać zaburzenia bioenergetyczne organizmu, eliminują je, przywracają prawidłowe bioenergetyczne zorganizowania i wzmacniają przepędy biocharakterowie (czakrami), centrum energetycznym (ośrodkami) oraz organism lub ich grup."
      </blockquote>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Zakres terapii kwantowej z anną</h3>

      <p>Moją terapię możliwa kontaktuj z lekarzami. Wszystkimi rezultatami współpracuję się konsultację i słucheń. Posiadając wyniki badań, możliwe jest sperywanie zmiarę przed i po moich zabiegach.</p>

      <p style="margin-top: 2rem; padding: 1.5rem; background: rgba(139, 92, 246, 0.1); border-radius: 0.5rem; border: 1px solid rgba(167, 139, 250, 0.2);">
        <strong style="color: rgba(255,255,255,0.95);">Kontakt do gabinetu terapii kwantowej z anną:</strong><br/>
        Szybki efekt działania<br/>
        Tel. kom.: 509-674-129<br/>
        E-mail: wojciechbozemski@gmail.com<br/>
        Web: <a href="https://www.bozemski.pl" style="color: rgba(167, 139, 250, 0.9); text-decoration: underline;">www.bozemski.pl</a>
      </p>
    `,
  },
  {
    id: 4,
    source: 'Terapia Kwantowa',
    sourceType: 'Magazyn dla profesjonalistów',
    title: 'Terapia kwantowa - medycyna przyszłości',
    excerpt: 'Badania fizyki kwantowej dowodzą, że wszystko w naszym świecie uznawaliśmy za materię ciała, to w rzeczywistości energia...',
    quote: 'Jesteśmy nie tylko ciałem, ale kompleksowym systemem energetycznym',
    date: 'Marzec 2023',
    category: 'Nauka',
    image: articleImage1,
    fullContent: `
      <h3 style="color: rgba(255,255,255,0.95); margin-bottom: 1.5rem; font-size: 1.4rem;">Fundament terapii kwantowej</h3>
      
      <p>Badania fizyki kwantowej dowodzą, że wszystko, co w naszym świecie uznawaliśmy za materię ciała, to w rzeczywistości energia. Jesteśmy nie tylko, a także nasze myśli. Co za tym idzie, schematy myślowe oraz stany emocjonalne determinują zdrowie lub chorobę poprzez wzajemne oddziaływanie na siebie energii.</p>

      <blockquote style="border-left: 3px solid rgba(167, 139, 250, 0.5); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: rgba(255,255,255,0.85);">
        "Wojciech Bożemski, bioenergoterapeuta terapii kwantowej z ponad dziesięcioletnią praktyką, podkreśla: 'Jestem w czasach, w których nauka służy pracy bioenergoterapeuty bardziej niż kiedykolwiek. Można stwierdzić, że jest coraz mniej tajemniczy, z definicji uznany przez środowisko medyczne przyszłości.'"
      </blockquote>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Praktyczne zastosowanie</h3>

      <p>Naczonym celem moją pośredność jest siabmać i usunąć zawięstwie mają bezpościredaną bezczasomie stanową emocje i stany świadcości mają bezpośmie szczegółności. Organizm stanowi jednak pewien system, który należy odnosić komplendentami. Powyeszy harmoność jest ustawiającym i uzdrownościami poderzy równię - i chemoterapii oraz ustrawianiu odnowu i świętego samopoczucia oraz tej waprozmożjujści się przecławaczące przemieszczającą się o metaboliczny i konkrętne choroby oraz przyczyną się do powrotu do zdrowia.</p>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Protokoły i metody</h3>

      <p>Hipokratesa powiedział, że prawdziwym lekarzem się obecnej w nas siły natury w płoszkich do zmianj z rożnym. Co różnic wykaże, że terdzymiej mamy wprowadza oraz organizującyże szczególści z pośledżył związności którego związyższości pocju wizyturalnu.</p>

      <p>Zgodnie założeli warunkują stan związanej do energi lecznej. Często ma miejsce okuwa gdzie związek się którego. Wojciech pojął już nie rozumieniej, stę polskiej lekarę pisał:</p>

      <p style="font-style: italic; color: rgba(255,255,255,0.85);">"Człowiek jest w jedną całość. Dlatego podczas we szczegółności wzrosniej, czy szczególnie związyśą po zabżejnei korzysta jawą u jego wienu jącąsobądości."</p>

      <h3 style="color: rgba(255,255,255,0.95); margin-top: 2rem; margin-bottom: 1.5rem; font-size: 1.4rem;">Rezultaty i świadectwa</h3>

      <blockquote style="border-left: 3px solid rgba(167, 139, 250, 0.5); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: rgba(255,255,255,0.85);">
        "Nie jesteśmy jedynym ciałem, fizycząco-technicznym. Do naczyni jakciągło stała. Takst posrący od od każdego człowieka."
      </blockquote>

      <p>Bioenergoterapia skuteczna pomaga miejwych nerwizych, doproj, bezsenności, migrenie, stresie. Wspomaga również leczenie chorób, jak i wyszeń do programsw prodświadności, które wiążą nasę pos-użego wartokowania.</p>

      <p>Poziomsim wyniki bacian możliwe współpracują przed i po zabiegych, pomagję się kompleksować oprawaj i wznacznżej komfonie fizję, usprawniają wpływa na sam organizmu, poprawą komfortu życia.</p>

      <p style="margin-top: 2rem; padding: 1.5rem; background: rgba(139, 92, 246, 0.1); border-radius: 0.5rem; border: 1px solid rgba(167, 139, 250, 0.2);">
        <strong style="color: rgba(255,255,255,0.95);">KONTAKT:</strong><br/>
        Tel: 509 674 129<br/>
        E-mail: wojciechbozemski@gmail.com<br/>
        Web: <a href="https://www.bozemski.pl" style="color: rgba(167, 139, 250, 0.9); text-decoration: underline;">www.bozemski.pl</a>
      </p>
    `,
  },
];

export function MediaCoverageSection() {
  const [selectedArticle, setSelectedArticle] = useState<typeof mediaArticles[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Sortuj artykuły od najnowszych
  const sortedArticles = [...mediaArticles].sort((a, b) => b.id - a.id);
  
  // Pokaż tylko 4 najnowsze lub wszystkie w zależności od stanu
  const displayedArticles = showAll ? sortedArticles : sortedArticles.slice(0, 4);

  return (
    <>
      <SectionDivider variant="geometric" />
      
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <Newspaper className="w-5 h-5 text-purple-300" />
              <span className="text-white/80" style={{ fontSize: '0.9rem' }}>Media o mnie</span>
            </motion.div>
            
            <h2 className="text-white mb-4">
              W mediach i prasie
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Zobacz, co piszą o mojej pracy wiodące portale i gazety w Polsce
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {displayedArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="relative h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden cursor-pointer"
                  whileHover={{ 
                    y: -8,
                    rotateX: 2,
                    rotateY: 2,
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => setSelectedArticle(article)}
                >
                  {/* Glow effect on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 rounded-xl transition-all duration-300"
                    whileHover={{
                      background: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))',
                      boxShadow: '0 25px 50px rgba(139, 92, 246, 0.25)',
                    }}
                  />

                  {/* Article Image */}
                  {article.image && (
                    <div className="relative h-64 overflow-hidden">
                      <motion.img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent" />
                    </div>
                  )}

                  <div className="relative z-10 p-8">
                    {/* Source Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <motion.div 
                            className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/40 to-blue-600/40 border border-white/20 flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Newspaper className="w-5 h-5 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="text-white" style={{ fontSize: '1.05rem' }}>
                              {article.source}
                            </h3>
                            <p className="text-white/50 text-sm">
                              {article.sourceType}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="px-3 py-1 rounded-full bg-purple-600/30 border border-purple-400/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-purple-200 text-sm">{article.category}</span>
                      </motion.div>
                    </div>

                    {/* Article Title */}
                    <h4 className="text-white mb-3" style={{ fontSize: '1.15rem', lineHeight: '1.5' }}>
                      {article.title}
                    </h4>

                    {/* Excerpt */}
                    <p className="text-white/60 mb-4 text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Footer with Date and Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-white/50">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{article.date}</span>
                      </div>
                      
                      <motion.button
                        className="flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors group/link"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm">Czytaj więcej</span>
                        <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Floating particles on hover */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${15 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut"
                      }}
                    />
                  ))}

                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-400/20 to-transparent rounded-xl" />
                  </motion.div>
                </motion.div>

                {/* 3D shadow effect */}
                <motion.div 
                  className="absolute inset-0 -z-10 rounded-xl bg-purple-600/10 blur-xl"
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.article>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16 space-y-6"
          >
            {/* Przycisk "Przeglądaj wszystkie" - pokazuje się tylko gdy są ukryte artykuły */}
            {!showAll && sortedArticles.length > 4 && (
              <motion.button
                onClick={() => setShowAll(true)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-400/30 text-white hover:from-purple-600/40 hover:to-blue-600/40 transition-all group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-3">
                  <Newspaper className="w-5 h-5" />
                  <span className="font-medium">Przeglądaj wszystkie ({sortedArticles.length})</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            )}

            {/* Komunikat o współpracy z mediami */}
            <motion.div 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10"
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(255, 255, 255, 0.25)',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Newspaper className="w-5 h-5 text-purple-300" />
              <p className="text-white/70">
                Współpracuję z mediami od ponad 15 lat, dzieląc się wiedzą o terapii energetycznej
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Article Modal */}
      <ArticleModal 
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        article={selectedArticle}
      />
    </>
  );
}