import { NextResponse } from 'next/server';

interface PytanieQuizu {
  pytanie: string;
  odpowiedzi: string[];
  poprawnaOdpowiedz: number;
  wyjasnienie: string;
}

const pulaPytanZBloga: PytanieQuizu[] = [
  // --- BLOK 1: Osteoporoza i złamania ---
  {
    pytanie: "Wyobraź sobie starszego mężczyznę (powyżej 50 r.ż.), który doznaje osteoporotycznego złamania biodra. Jakie jest statystyczne ryzyko, że umrze w ciągu zaledwie jednego roku po operacji?",
    odpowiedzi: ["Mniej niż 1%", "Około 5%", "10-15%", "Szokujące 30-32%"],
    poprawnaOdpowiedz: 3,
    wyjasnienie: "Złamania z powodu kruchości kości to cichy zabójca. Z polskich danych (Glinkowski et al., 2019) wynika, że roczna śmiertelność wynosi aż 30.4% - 32.8% dla mężczyzn! Trening siłowy, chroniący układ kostny, to dosłownie inwestycja w życie."
  },
  {
    pytanie: "Kto w Polsce znacznie częściej trafia do szpitala ze złamaniem osteoporotycznym – kobiety czy mężczyźni?",
    odpowiedzi: ["Mężczyźni, z powodu cięższej pracy fizycznej", "Kobiety (łamią kości prawie 2,5 raza częściej)", "Ryzyko jest dokładnie takie samo dla obu płci", "Zależy to wyłącznie od regionu zamieszkania"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Według polskich badań stosunek złamań kobiet do mężczyzn wynosi aż 2.46. Zmiany hormonalne następujące u kobiet po menopauzie drastycznie przyspieszają utratę gęstości mineralnej kości."
  },
  {
    pytanie: "Choć statystycznie to kobiety ponoszą ponad dwukrotnie wyższe ryzyko samego złamania biodra z powodu osteoporozy, kto wykazuje WYŻSZĄ śmiertelność w rok po takim urazie?",
    odpowiedzi: ["Mężczyźni", "Kobiety", "Osoby z niedowagą niezależnie od płci", "Nie ma różnicy między płciami"],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Mężczyźni łamią kości rzadziej, ale statystyki śmiertelności są dla nich bardziej bezlitosne (powyżej 30% dla panów vs ok. 26-28% dla pań). Dlatego opieka pourazowa jest kluczowa w obu przypadkach."
  },
  {
    pytanie: "Z wiekiem ryzyko drastycznie rośnie. Jak dramatycznie wysoka jest śmiertelność (w ciągu zaledwie 12 miesięcy) po złamaniu szyjki kości udowej u pacjentów w przedziale 80-89 lat?",
    odpowiedzi: ["Osiąga około 15%", "Przekracza 30%", "Wynosi przerażające ponad 50%", "Wynosi 100%"],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "To najbardziej wstrząsająca statystyka. W grupie 80-89 lat śmiertelność w rok po złamaniu przekracza 50% (Glinkowski et al., 2019). Mięśnie i mocne kości zbudowane za młodu na siłowni naprawdę ratują życie na starość!"
  },
  {
    pytanie: "Czy dzięki postępowi medycyny i suplementom, liczba osteoporotycznych złamań biodra w Polsce (w latach 2008-2015) wreszcie zaczęła maleć?",
    odpowiedzi: ["Tak, spadła o blisko połowę", "Statystyki stoją w miejscu", "Nie, liczba złamań wzrosła o 14-19%", "Zniknęła całkowicie dzięki witaminie D3"],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Niestety, problem drastycznie narasta! Liczba złamań wzrosła aż o 19.4% u kobiet i 14.2% u mężczyzn. Siedzący tryb życia, zła dieta i unikana aktywność oporowa zbierają ponure żniwo."
  },
  {
    pytanie: "Ile wynosi średni czas pobytu pacjenta po złamaniu biodra w polskim szpitalu publicznym?",
    odpowiedzi: ["Zazwyczaj 2-3 dni", "Około 11-13 dni", "Równo miesiąc", "Nawet pół roku"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Według danych czas hospitalizacji po operacji zmniejszył się w ostatnich latach z 13.6 do 11.2 dnia, co oznacza szybszy wypis, ale przed pacjentem i jego rodziną miesiące niezwykle ciężkiej rehabilitacji domowej."
  },
  {
    pytanie: "Jaki rodzaj aktywności fizycznej jest naukowo najsilniejszym bodźcem, który możemy zaaplikować w prewencji osteoporozy i złamań (tzw. budowanie gęstości kości)?",
    odpowiedzi: ["Tylko pływanie, bo odciąża stawy", "Codzienne, delikatne sesje stretchingu", "Trening siłowy (oporowy z obciążeniem)", "Spacery w tempie rekreacyjnym"],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Zgodnie z Prawem Wolffa, obciążenie mechaniczne generowane np. podczas dźwigania ciężarów stymuluje kości do nadbudowy i utwardzenia się. Samo pływanie (brak kompresji grawitacyjnej) nie daje tak mocnego impulsu osteogennego!"
  },
  // --- BLOK 2: Regeneracja tkanek ---
  {
    pytanie: "Wracasz do mocnych treningów po urazie. Po 4 tygodniach ból znika całkowicie, a Twój mięsień wydaje się 'jak nowy' (odzyskał ok. 80% sprawności). Na jakim etapie gojenia jest wtedy Twoje uszkodzone ścięgno?",
    odpowiedzi: ["Również na ok. 80%", "Jest już dawno zregenerowane w 100%", "Dopiero na poziomie ok. 40%", "Ścięgna nie ulegają mikrouszkodzeniom"],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "To największa pułapka treningowa! Zgodnie z modelem obciążeń tkanek Benage (2022), mięśnie regenerują się drastycznie szybciej. Brak bólu mięśniowego to absolutnie NIE JEST sygnał do bicia rekordów – ścięgno jest wciąż słabe!"
  },
  {
    pytanie: "Ile czasu zazwyczaj trwa ostatnia, niezwykle ważna faza regeneracji ścięgna (tzw. faza przebudowy / remodeling)?",
    odpowiedzi: ["Zwykle około tygodnia", "Dokładnie 14 dni i noc", "Od kilku miesięcy do nawet LAT", "Kończy się w sekundę po ustąpieniu opuchlizny"],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Proces układania nowych, silnych włókien kolagenowych w ścięgnie tak, by znów zniosło potężne obciążenie mechaniczne, to praca na długie miesiące (a często lata). Cierpliwość to klucz do braku nawrotów kontuzji."
  },
  {
    pytanie: "Każdy proces regeneracji zaczyna się tak samo. Ile średnio trwa pierwsza faza odpowiedzi organizmu na uraz (faza zapalna)?",
    odpowiedzi: ["Od 0 do ok. 1 tygodnia", "3 pełne miesiące", "Zależnie od pogody – nawet do roku", "Trwa zaledwie kilka minut po urazie"],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Zgodnie z nauką o tkankach faza zapalna zajmuje z reguły pierwszy tydzień. To czas bólu, ciepła i obrzęku. Choć jest to bolesne, stan zapalny jest konieczny, aby rozpocząć czyszczenie tkanki i proces gojenia!"
  },
  {
    pytanie: "Zgodnie z modelami gojenia uszkodzeń narządu ruchu (Benage 2022), po ilu tygodniach tkanka mięśniowa dobija do pułapu prawie 100% sprawności od kontuzji?",
    odpowiedzi: ["Po 1 tygodniu", "Po 4 tygodniach", "Dopiero w okolicy 12 tygodni", "Tkanka mięśniowa nigdy się nie regeneruje"],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Choć odczucia 'lekkości' i braku bólu przychodzą bardzo szybko (już po 3-4 tyg), na pełną, wewnątrzkomórkową odpowiedź adaptacyjną mięśnia dającą 100% siły trzeba poczekać około 3 miesięcy (12 tygodni)."
  },
  {
    pytanie: "Jesteś 12 tygodni po kontuzji. Twój mięsień zregenerował się w 100% – na ile procent sprawności do przenoszenia obciążeń wyceniane jest w tym samym czasie uszkodzone ścięgno?",
    odpowiedzi: ["Jest wciąż na poziomie 20%", "Ma dopiero ok. 75% funkcjonalności", "Zrównało się z mięśniem (100%)", "Zyskało nadludzką siłę rzędu 150%"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "To jest właśnie moment 'pozornego bezpieczeństwa', w którym amatorzy nagle wrzucają na sztangę życiówki i… zrywają mięsień ze ścięgna. Mięsień może podnieść ciężar, ale tkanka łącząca (na 75%) jeszcze nie!"
  },
  {
    pytanie: "Jaki jest podstawowy powód fizjologiczny tłumaczący drastyczną przepaść w tempie gojenia między tkanką mięśniową a ścięgnami?",
    odpowiedzi: ["Ścięgna nie zawierają w ogóle komórek", "Do ścięgien dociera dużo mniej krwi i składników odżywczych (słabe ukrwienie)", "Mięśnie są bliżej skóry", "Mięśnie mogą pobierać energię bezpośrednio ze słońca"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Tkanka mięśniowa to genialna, mocno ukrwiona gąbka, która ma masę naczyń krwionośnych - dzięki temu bardzo szybko się naprawia. Ścięgna (tkanka łączna) są w znacznej mierze słabo ukrwione, co drastycznie hamuje ich metabolizm i naprawę."
  },
  {
    pytanie: "Mając świadomość tej różnicy w gojeniu tkanek (mięśnie vs ścięgna), jak należy mądrze programować powroty na siłownię np. po dłuższym urlopie lub chorobie?",
    odpowiedzi: ["Robić 1 powtórzenie maksymalne w celu testu siły", "Wystartować lekko i celowo dawkować mniejsze objętości (i ciężary) stopniowo z tygodnia na tydzień", "Ćwiczyć wyłącznie na maszynach pneumatycznych", "Używać tylko gum oporowych przez kolejne pół roku"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Adaptacja (remodeling) powolnego ścięgna musi mieć szansę 'dogonić' dużo szybciej wracającą pamięć mięśniową. Złota zasada to powolne, konsekwentne (liniowe) dodawanie obciążeń, żeby nie zaskoczyć organizmu!"
  },
  // --- BLOK 3: Diety ---
  {
    pytanie: "'Keto to jedyna dieta, na której zgubisz brzuch' - a co na to potężna naukowa metaanaliza z 2012 roku porównująca restrykcyjne diety (Hu et al.)?",
    odpowiedzi: ["W 100% przyznaje temu rację", "Udowadnia, że OBA modele diety (niskowęglowodanowa i niskotłuszczowa) odchudzają bardzo skutecznie", "Wskazuje, że diety ogólnie nie prowadzą do chudnięcia", "Stwierdza, że schudnąć można tylko pijąc specjalne koktajle"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Koniec internetowych kłótni! Analizując tysiące pacjentów badacze wykazali jednoznacznie: diety niskowęglowodanowe (Low-Carb) oraz niskotłuszczowe (Low-Fat) w tym samym stopniu pomagają pacjentom skutecznie utracić kilogramy (w warunkach deficytu)."
  },
  {
    pytanie: "Co stanie się z Twoimi wynikami (np. ryzykiem miażdżycy, cholesterolem), jeśli skutecznie schudniesz stosując dietę o wysokiej podaży węglowodanów, ale z obciętym tłuszczem (Low-Fat)?",
    odpowiedzi: ["Zdrowie ulegnie pogorszeniu z racji nadmiaru węgli", "Cukier natychmiast wywoła stan zapalny serca", "Podobnie jak w Low-Carb, wyniki badań (markery zdrowia) ulegną silnej POPRAWIE", "Zmieni się waga, ale markery krwi zostaną bez zmian"],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Samo zrzucenie otyłości jest lekarstwem! Metaanalizy wykazują, że niezależnie od tego czy ucinałeś masło czy ryż, skuteczna redukcja wagi drastycznie zdejmuje stres metaboliczny z narządów wewnętrznych."
  },
  {
    pytanie: "Na Instagramie dieta 'Niskowęglowodanowa' to najczęściej reżim <50g cukru. Tymczasem w profesjonalnej metaanalizie naukowej próg dla bycia Low-Carb to...?",
    odpowiedzi: ["Dokładnie 0g węglowodanów", "Dieta, w której z węgli pochodzi nawet do 45% dziennej podaży energetycznej", "Próg maksymalnie 10g cukru z warzyw", "Brak limitu, dopóki pacjent je sałatki"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Zaskoczenie! W badaniach naukowych 'Low-Carb' rzadko oznacza drastyczne ketozy. Zazwyczaj to po prostu rozsądne obniżenie ich poziomu do ≤45% puli kalorii. Nie musisz rezygnować z ulubionych owoców, by dbać o profil metaboliczny!"
  },
  {
    pytanie: "Co w tych samych analizach zdefiniowano jako zdrowotną dietę 'Niskotłuszczową' (Low-Fat)?",
    odpowiedzi: ["Reżim dostarczający maksymalnie 30% dziennej energii z tłuszczu", "Maksymalnie 5g tłuszczu tylko w postaci orzechów", "Spożywanie wyłącznie samych białek", "Picie tylko chudego mleka"],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Dieta zredukowana w tłuszcze to nie jest ekstremalnie suche i niesmaczne jedzenie. Próg w badaniach wynosił ≤30% energii z tłuszczu. Pozwala to na smaczny kompromis np. między chudym mięsem, znikomą ilością oliwy a większą dawką smacznych węglowodanów."
  },
  {
    pytanie: "Dlaczego metaanaliza udowadniająca skuteczność obydwu modeli żywieniowych jest 'najsilniejszym orężem' dla dietetyków opartej na dowodach medycznych (EBM)?",
    odpowiedzi: ["Ponieważ brała udział w niej ogromna ilość gwiazd fitness", "Ponieważ opiera się na recenzowanych Randomizowanych Badaniach Kontrolowanych (RCT) – tzw. 'złotym standardzie'", "Bo sponsorował ją wielki koncern przemysłu spożywczego", "Ponieważ wygrywa w ankietach popularności"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Metaanaliza RCT znajduje się na samym absolutnym szczycie piramidy dowodów naukowych. Zbiera wyniki dziesiątek eksperymentów rygorystycznie kontrolujących spożycie posiłków przez ochotników, zamykając usta pojedynczym i źle sprawdzonym badaniom obserwacyjnym."
  },
  {
    pytanie: "Wnioski na talerz: Skoro potężne badania sugerują, że chudniemy równie dobrze na diecie białkowo-tłuszczowej jak i węglowodanowej. Co gwarantuje w 100% Twoje efekty?",
    odpowiedzi: ["Spożywanie tabletek 'spalających' w nocy", "Codzienne picie przegotowanej wody z cytryną na czczo", "Skuteczne utrzymywanie umiarkowanego deficytu kalorycznego i dobór produktów tak, żeby posiłki sprawiały nam frajdę", "Regularne robienie drastycznych 5-dniowych postów wodnych"],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Królową i Królem odchudzania są bilans kaloryczny oraz 'adherence' (zgodność i satysfakcja z utrzymania). Zamiast wchodzić w diety, których nienawidzisz, wybierz taką strukturę posiłków, którą będziesz w stanie z uśmiechem utrzymać za 2 lata!"
  },
  {
    pytanie: "'Jedząc tak dużo węgli, Twój układ sercowo-naczyniowy wysiądzie' – jak do tych słów mają się wielkie wnioski z przeglądu systematycznego opublikowanego w British Journal of Nutrition?",
    odpowiedzi: ["Niestety, jest to szczera i niepodważalna prawda", "Prawda, pod warunkiem, że omijamy ziemniaki i banany", "To czysty mit. Zarówno odchudzanie z ograniczeniem (LF) i z użyciem węglowodanów (LC) świetnie poprawia markery CVD", "Węglowodany wywołują palpitacje przy wyższym tętnie"],
    poprawnaOdpowiedz: 2,
    wyjasnienie: "Twierdzenie o chorobotwórczych 'węglach' to jedno z największych kłamstw branży. Proces samej utraty tłuszczu trzewnego i poprawy wrażliwości na insulinę doskonale regeneruje układ krwionośny organizmu niezależnie od tego, jakim makroskładnikiem operujesz!"
  },
  // --- BLOK 4: Adaptacje biegowe ---
  {
    pytanie: "Czy bieganie służy tylko do spalania kalorii?",
    odpowiedzi: ["Tak, to jego główny cel", "Nie, gruntownie przebudowuje całe ciało"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Bieganie to nie tylko spalanie kalorii, to zmiana struktury serca, płuc, mięśni, a nawet kości!"
  },
  {
    pytanie: "Co się dzieje z Twoim sercem, gdy regularnie biegasz?",
    odpowiedzi: ["Zwiększa swoją pojemność", "Bije coraz szybciej w spoczynku"],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Serce staje się większym 'zbiornikiem'. Przy jednym uderzeniu potrafi wypompować więcej krwi niż serce osoby nietrenującej."
  },
  {
    pytanie: "Dlaczego u biegaczy tętno spoczynkowe spada?",
    odpowiedzi: ["Bo serce jest słabsze", "Bo serce jednym uderzeniem pompuje więcej krwi"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Twoja 'pompa' jest tak silna i duża, że musi bić rzadziej, by obsłużyć organizm w spoczynku."
  },
  {
    pytanie: "Po jakim czasie od rozpoczęcia biegania rośnie objętość osocza (krwi)?",
    odpowiedzi: ["Po 1-2 tygodniach", "Po 2-3 miesiącach"],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Już po kilkunastu dniach masz w sobie więcej płynu! Dzięki temu serce ma co pompować."
  },
  {
    pytanie: "Czy sama większa ilość krwi wystarczy, by mieć świetną kondycję?",
    odpowiedzi: ["Tak", "Nie, liczy się jakość (więcej czerwonych krwinek)"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Krew musi transportować tlen. Z czasem organizm produkuje więcej hemoglobiny, więc krew staje się 'gęstsza' od nośników tlenu."
  },
  {
    pytanie: "Jak organizm 'wie', że musi wyprodukować więcej krwinek?",
    odpowiedzi: ["Sam z siebie", "Dostaje sygnał, że brakuje mu tlenu w pracy"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Trening to pozytywny stres. Zmuszasz organizm do wysiłku, a on w nagrodę buduje lepszą flotę transportową dla tlenu."
  },
  {
    pytanie: "Czym są mitochondria w naszych mięśniach?",
    odpowiedzi: ["Magazynami tłuszczu", "Małymi elektrowniami produkującymi energię"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Trening tlenowy sprawia, że w Twoich mięśniach powstaje mnóstwo nowych 'elektrowni'. Masz po prostu więcej prądu!"
  },
  {
    pytanie: "Co to jest 'kapilaryzacja' w kontekście biegania?",
    odpowiedzi: ["Budowa nowych, małych naczyń krwionośnych", "Zakwasy po treningu"],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Organizm buduje nowe 'ulice', by krew (i tlen) mogła szybciej i łatwiej dojechać do pracujących mięśni."
  },
  {
    pytanie: "Skoro zbudujesz więcej naczyń krwionośnych w mięśniach, to co się stanie?",
    odpowiedzi: ["Będziesz biegać tym samym tempem, ale mniej się zmęczysz", "Mięśnie staną się cięższe"],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Więcej dróg dostawczych = więcej tlenu = mniejsze zmęczenie przy tej samej prędkości."
  },
  {
    pytanie: "Po jakim czasie organizm buduje nowe elektrownie (mitochondria)?",
    odpowiedzi: ["Po pierwszym treningu", "To efekt systematycznej pracy (kilka miesięcy)"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Adaptacje strukturalne wymagają czasu. Bądź cierpliwy, a Twoje miasto zyska nowe elektrownie!"
  },
  {
    pytanie: "Czy regularne bieganie powiększa rozmiar płuc?",
    odpowiedzi: ["Tak, rosną jak mięśnie", "Nie, ich objętość się nie zmienia"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Objętość płuc u dorosłego się nie zmienia (nie rosną jak biceps od hantli!). To, co się zmienia, to ich wydajność."
  },
  {
    pytanie: "Na czym polega poprawa pracy płuc u biegacza?",
    odpowiedzi: ["Więcej powietrza mieści się w klatce", "Krew szybciej 'wyciąga' tlen z powietrza"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Biegacz sprawniej przenosi tlen z płuc do krwi. Nie musi pompować więcej powietrza, po prostu lepiej je wykorzystuje."
  },
  {
    pytanie: "Czy maski treningowe (ograniczające tlen) mają sens u amatorów?",
    odpowiedzi: ["Tak, super budują kondycję", "Nie, płuca rzadko są słabym ogniwem"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "U zdrowych ludzi to nie płuca ograniczają kondycję, ale serce i mięśnie (ich zdolność do transportu i odbioru tlenu)."
  },
  {
    pytanie: "Co bieganie (uderzenia stopą o ziemię) robi z naszymi kośćmi?",
    odpowiedzi: ["Niszczy je i ściera", "Zwiększa ich gęstość mineralną (są twardsze)"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Bieganie (impact) to sygnał dla kości, by stały się gęstsze i mocniejsze. To świetna ochrona przed osteoporozą."
  },
  {
    pytanie: "Co adaptuje się do wysiłku wolniej?",
    odpowiedzi: ["Serce i mięśnie", "Kości i ścięgna"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "To pułapka na początkujących! Twoja kondycja (serce) rośnie szybko, ale ścięgna potrzebują wielu miesięcy, by znieść większe obciążenia."
  },
  {
    pytanie: "Jak działa ścięgno Achillesa u dobrego biegacza?",
    odpowiedzi: ["Jak luźna guma", "Jak sztywna sprężyna"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Sztywne ścięgno Achillesa magazynuje energię przy lądowaniu i oddaje ją przy wybiciu. Dzięki temu biegasz ekonomiczniej!"
  },
  {
    pytanie: "Dlaczego kontuzje Achillesa wychodzą po 2-3 miesiącach biegania?",
    odpowiedzi: ["Bo źle dobrałeś buty", "Bo kondycja pozwoliła Ci biegać za dużo i za szybko, a ścięgno nie nadążyło"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Zbyt szybki progres zabija ścięgna, bo potrzebują one o wiele więcej czasu na przebudowę niż mięśnie i płuca."
  },
  {
    pytanie: "Wyobraź sobie wylewanie betonu na strop. Kiedy beton zyskuje pełną twardość?",
    odpowiedzi: ["Po 2 dniach", "Po wielu miesiącach (jak nasze ścięgna)"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Nie dokładaj obciążeń za szybko. Daj swojemu 'betonowi' (kościom i ścięgnom) czas na stwardnienie!"
  },
  {
    pytanie: "Każdy krok w biegu to uderzenie o sile:",
    odpowiedzi: ["Równej wadze Twojego ciała", "2-3 krotności wagi Twojego ciała"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Dlatego tak ważne jest, by budować kilometraż mądrze i powoli. Twój układ ruchu przyjmuje ogromne siły."
  },
  {
    pytanie: "Co regularne bieganie robi z wrażliwością na insulinę?",
    odpowiedzi: ["Poprawia ją (to bardzo dobrze!)", "Pogarsza ją"],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Twoje ciało uczy się błyskawicznie wychwytywać glukozę z krwi i pakować ją do mięśni. To świetna ochrona przed cukrzycą."
  },
  {
    pytanie: "Kiedy biegasz regularnie, Twój organizm uczy się lepiej spalać...",
    odpowiedzi: ["Cukry (węglowodany)", "Tłuszcze"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Trening tlenowy uczy ciało oszczędzać glikogen (cukier) i czerpać energię ze stabilnego źródła, jakim jest tkanka tłuszczowa."
  },
  {
    pytanie: "Czy organizm 'spala tłuszcz' tylko podczas samego treningu?",
    odpowiedzi: ["Tak, po treningu przestaje", "Nie, uczy się spalać go skuteczniej również w spoczynku"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Dzięki nowym enzymom (beta-oksydacji), Twój metabolizm w spoczynku sprawniej korzysta z tłuszczu jako paliwa."
  },
  {
    pytanie: "Jak organizm biegacza radzi sobie z glukozą z jedzenia?",
    odpowiedzi: ["Łatwo zamienia ją w tkankę tłuszczową", "Szybko ładuje ją do 'magazynów' w mięśniach"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Dzięki lepszej wrażliwości insulinowej organizm nie musi produkować dużo insuliny, by poradzić sobie z węglowodanami."
  },
  {
    pytanie: "Z punktu widzenia biologii, bieganie to dla ciała:",
    odpowiedzi: ["Czysty relaks", "Stres, ale ten kontrolowany i budujący"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "To dzięki tej dawce stresu organizm się wzmacnia (adaptuje). Ale uwaga: stresu nie może być za dużo!"
  },
  {
    pytanie: "Co się dzieje z kortyzolem (hormonem stresu) u regularnych biegaczy?",
    odpowiedzi: ["Stale rośnie", "Organizm uczy się go lepiej regulować"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Aktywność fizyczna pomaga ustabilizować dobowy rytm kortyzolu, dzięki czemu lepiej radzisz sobie ze stresem w pracy czy w życiu."
  },
  {
    pytanie: "Co to jest 'przetrenowanie'?",
    odpowiedzi: ["Gdy masz zakwasy", "Gdy zafundujesz ciału za dużo stresu bez regeneracji"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Jeśli przesadzisz, kortyzol wystrzeli w kosmos, psując Twój sen, apetyt i chęci do życia."
  },
  {
    pytanie: "Pierwszy objaw, że biegasz za dużo i się nie regenerujesz to:",
    odpowiedzi: ["Szybsze tempo", "Problemy ze snem i spadek libido"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Zbyt duży stres treningowy rozregulowuje układ hormonalny. Jeśli nie możesz spać, to znak, żeby odpocząć!"
  },
  {
    pytanie: "Czy więcej treningu ZAWSZE oznacza lepszą formę?",
    odpowiedzi: ["Tak, no pain no gain!", "Nie, forma rośnie podczas odpoczynku"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Trening daje bodziec. Adaptacja (czyli to, że stajesz się lepszy) zachodzi, kiedy śpisz i jesz."
  },
  {
    pytanie: "Jak sprawdzić, czy zaszły u Ciebie adaptacje po miesiącach biegania?",
    odpowiedzi: ["Biegniesz tym samym tempem co kiedyś, ale tętno jest dużo niższe", "Musisz biegać 3x szybciej"],
    poprawnaOdpowiedz: 0,
    wyjasnienie: "Niższe tętno przy tej samej prędkości to dowód na to, że serce urosło, a układ krwionośny ma więcej 'ulic'."
  },
  {
    pytanie: "Po 3 miesiącach regularnego biegania poczułeś okropny ból ścięgna. Dlaczego?",
    odpowiedzi: ["Bo źle stanąłeś", "Bo mięśnie i płuca pozwalały biec szybko, ale ścięgna nie były gotowe"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Pamiętaj o zasadzie 'betonu'! Serce szybko domaga się wysiłku, układ ruchu błaga o cierpliwość."
  },
  {
    pytanie: "Dlaczego tętno spoczynkowe u wyczynowych biegaczy wynosi np. 40 uderzeń/min?",
    odpowiedzi: ["Są chorzy", "Mają potężną pojemność wyrzutową serca"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Ich serce jest tak mocnym silnikiem, że nie musi szybko bić, by utrzymać organizm przy życiu."
  },
  {
    pytanie: "Czy można poprawić formę biegając tylko 'na maksa'?",
    odpowiedzi: ["Tak", "Nie, spokojne bieganie buduje fundamenty (mitochondria i naczynia)"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Spokojne wybiegania to czas, w którym ciało w spokoju buduje nowe 'elektrownie' i 'drogi dostawcze'."
  },
  {
    pytanie: "Jaka jest najważniejsza zasada planu treningowego?",
    odpowiedzi: ["Biegać do porzygu", "Progresja i cierpliwość"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Twoje ciało to cudowna maszyna, która dostosuje się do wszystkiego, jeśli tylko dasz jej odpowiednio dużo czasu."
  },
  {
    pytanie: "Ile czasu potrzeba, by zobaczyć realne, strukturalne zmiany w sercu (np. powiększenie komory)?",
    odpowiedzi: ["1-2 tygodnie", "Kilka miesięcy (2-3)"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Pierwsze efekty (spadek tętna) to kwestia osocza krwi, ale prawdziwa rozbudowa silnika (serca) zajmuje miesiące."
  },
  {
    pytanie: "Z czego głównie wynika poprawa Twojej kondycji na dystansie 5-10 km?",
    odpowiedzi: ["Ze zrzucenia zbędnych kilogramów", "Z lepszego dostarczania tlenu i sprawnej produkcji energii z niego"],
    poprawnaOdpowiedz: 1,
    wyjasnienie: "Masz silniejsze serce, więcej krwinek, sprawniejsze płuca i mnóstwo mitochondriów w mięśniach!"
  },
];

export async function GET() {
  try {
    const teraz = new Date();
    const rok = teraz.getFullYear();
    const miesiac = String(teraz.getMonth() + 1).padStart(2, '0');
    const dzien = String(teraz.getDate()).padStart(2, '0');
    const dzisiaj = `${rok}-${miesiac}-${dzien}`;

    // Dzień roku jako indeks (1, 2, 3...)
    const poczatekRoku = new Date(teraz.getFullYear(), 0, 0);
    const roznica = teraz.getTime() - poczatekRoku.getTime();
    const dzienRoku = Math.floor(roznica / (1000 * 60 * 60 * 24));

    const pytanNaDzien = 5;
    const iloscPytan = pulaPytanZBloga.length; // 56 pytań = 11 unikalnych dni

    const startIndex = ((dzienRoku - 1) * pytanNaDzien) % iloscPytan;

    let pytaniaNaDzis: PytanieQuizu[];

    if (startIndex + pytanNaDzien <= iloscPytan) {
      pytaniaNaDzis = pulaPytanZBloga.slice(startIndex, startIndex + pytanNaDzien);
    } else {
      pytaniaNaDzis = [
        ...pulaPytanZBloga.slice(startIndex),
        ...pulaPytanZBloga.slice(0, pytanNaDzien - (iloscPytan - startIndex))
      ];
    }

    return NextResponse.json({
      data: dzisiaj,
      pytania: pytaniaNaDzis,
    });
  } catch {
    return NextResponse.json(
      { blad: 'Nie udało się pobrać pytań' },
      { status: 500 }
    );
  }
}