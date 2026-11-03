/*
  SANAD website content
  ---------------------
  All text and lists on the site live here. To update the site, edit this file only.
  Every text field has an Arabic ("ar") and English ("en") version.

  Status values (used for communities and programs):
    "active"   → running now
    "forming"  → team formed / in development
    "planned"  → future plan

  Fields marked TODO still need real values.
*/
window.SANAD = {
  links: {
    instagram: "https://www.instagram.com/we.are.sanad/",
    linkedin: "https://www.linkedin.com/company/sanad-community/",
    youtube: "", // TODO: YouTube channel URL, shown in "Find us on" once set
    joinForm: "https://forms.gle/wwqB7hA7KaAkeSjs6",
    whatsapp: "", // no public invite link: people are added after filling the join form
    volunteerForm: "", // shared inside the WhatsApp community; leave empty
    email: "sanad.research.community@gmail.com"
  },

  ui: {
    navAbout: { ar: "من نحن", en: "About" },
    navCommunities: { ar: "مجتمعاتنا", en: "Communities" },
    navPrograms: { ar: "المبادرات", en: "Programs" },
    navEvents: { ar: "الفعاليات", en: "Events" },
    navJoin: { ar: "انضموا إلينا", en: "Join us" },
    langSwitch: { ar: "English", en: "عربي" },

    heroEyebrow: { ar: "مجتمع الباحثات والباحثين العرب", en: "The community of Arab researchers" },
    heroTitle: { ar: "سند — لأن الطريق الأكاديمي أسهل مع بعض.", en: "Building a stronger research community, together." },
    heroText: {
      ar: "مجتمع أكاديمي يقوده طلاب وطالبات، يجمع طلاب الماجستير والدكتوراه وباحثي ما بعد الدكتوراه وأعضاء الهيئات التدريسية العرب، ليدعم بعضهم بعضًا أكاديميًا ومهنيًا وشخصيًا.",
      en: "A student-led academic community connecting Arab Master's and PhD students, postdocs and faculty, so researchers can help each other succeed academically, professionally and personally."
    },
    ctaJoin: { ar: "انضموا للمجتمع", en: "Join the community" },
    ctaVolunteer: { ar: "تطوّعوا معنا", en: "Become a volunteer" },

    aboutKicker: { ar: "من نحن", en: "About us" },
    aboutTitle: { ar: "سند يعني أن يكون لك من تستند إليه", en: "SANAD means having someone to lean on" },
    aboutStory: {
      ar: "بدأ سند كمبادرة محلية في معهد وايزمان للعلوم، ومنذ ذلك الحين توسّع ليصبح مجتمعًا يجمع طلابًا وطالبات، باحثين وباحثات، من عدة جامعات ومؤسسات بحثية.",
      en: "SANAD started as a local initiative at the Weizmann Institute of Science and has since grown into a community bringing together students and researchers from several universities and research institutions."
    },
    aboutChallenges: {
      ar: "نعمل على مواجهة العزلة الأكاديمية، وقلة الوصول إلى الإرشاد والشبكات المهنية، وضعف التمثيل، وعدم تكافؤ الوصول إلى المعلومات والفرص.",
      en: "We work against academic isolation, limited access to mentorship and professional networks, under-representation, and unequal access to information and opportunities."
    },
    missionLabel: { ar: "رسالتنا", en: "Mission" },
    mission: {
      ar: "بناء مجتمع بحثي عربي قوي ومترابط وداعم، يساعد فيه الباحثات والباحثون بعضهم بعضًا على النجاح.",
      en: "To build a strong, supportive and interconnected Arab research community where researchers help each other succeed."
    },
    visionLabel: { ar: "رؤيتنا", en: "Vision" },
    vision: {
      ar: "شبكة قطرية مستدامة ترافق الباحثات والباحثين العرب في كل مراحل مسيرتهم: من الدراسات العليا، إلى ما بعد الدكتوراه، وحتى المناصب الأكاديمية.",
      en: "A sustainable national network supporting Arab researchers at every stage: from graduate studies to postdoctoral research and faculty positions."
    },
    audienceTitle: { ar: "لمن سند؟", en: "Who is SANAD for?" },
    audienceFields: {
      ar: "جميع مجالات العلوم والتكنولوجيا: علوم الحاسوب، الرياضيات، الفيزياء، الكيمياء، الأحياء، الطب، الهندسة وغيرها.",
      en: "All STEM fields: computer science, mathematics, physics, chemistry, biology, medicine, engineering and more."
    },
    valuesTitle: { ar: "قيمنا", en: "Our values" },

    communitiesKicker: { ar: "مجتمعاتنا", en: "Our communities" },
    communitiesTitle: { ar: "مجتمعات محلية، ومجتمع سند واحد", en: "Local communities, one SANAD community" },
    communitiesText: {
      ar: "لكل جامعة مجتمع محلي ومنسّقون ينظّمون لقاءات شهرية ومحاضرات وورشات ونشاطات اجتماعية، وجميعها مترابطة عبر مجتمع سند.",
      en: "Each university has a local community and coordinators who run monthly gatherings, talks, workshops and social activities, all connected through the SANAD community."
    },
    coordinators: { ar: "المنسّقون", en: "Coordinators" },
    coordinatorsTbd: { ar: "سيُعلن قريبًا", en: "To be announced" },

    programsKicker: { ar: "المبادرات", en: "Programs" },
    programsTitle: { ar: "ماذا نفعل", en: "What we do" },

    statusActive: { ar: "فعّال", en: "Active" },
    statusForming: { ar: "قيد التطوير", en: "In development" },
    statusPlanned: { ar: "مخطّط", en: "Planned" },

    eventsKicker: { ar: "الفعاليات", en: "Events" },
    eventsTitle: { ar: "لقاءات تجمعنا", en: "Gatherings that bring us together" },
    upcomingTitle: { ar: "الفعاليات القادمة", en: "Upcoming" },
    upcomingEmpty: {
      ar: "نعلن عن الفعاليات القادمة عبر إنستغرام ومجموعات الواتساب. تابعونا كي لا يفوتكم شيء.",
      en: "Upcoming events are announced on Instagram and in our WhatsApp groups. Follow us so you don't miss anything."
    },
    pastTitle: { ar: "من نشاطاتنا", en: "Past activities" },
    register: { ar: "سجّلوا", en: "Register" },

    teamKicker: { ar: "الفريق", en: "Team" },
    teamTitle: { ar: "مجتمع يقوده طلاب وطالبات متطوّعون", en: "A community led by student volunteers" },
    teamText: {
      ar: "يقوم سند على طلاب متطوّعين من جامعات مختلفة، يعملون معًا في فرق تنظّم اللقاءات، وتطوّر المبادرات، وتبني المجتمع. ثقافتنا منفتحة وتعاونية: كل عضو مدعوّ لأخذ المبادرة واقتراح المشاريع والتطوّع.",
      en: "SANAD is built by student volunteers from different universities, working together in teams that organize meetups, develop programs and grow the community. Our culture is open and collaborative: every member is invited to take initiative, propose projects and volunteer."
    },
    founder: { ar: "مؤسس ومنسّق المجتمع", en: "Founder & community coordinator" },
    seeFullTeam: { ar: "تعرّفوا على الفريق كاملًا", en: "Meet the full team" },

    navTeam: { ar: "الفريق", en: "Team" },
    navFindUs: { ar: "تابعونا", en: "Find us" },
    navFaq: { ar: "أسئلة شائعة", en: "FAQ" },
    galleryTitle: { ar: "من نشاطاتنا", en: "From our activities" },
    close: { ar: "إغلاق", en: "Close" },
    photos: { ar: "صور", en: "photos" },
    episode: { ar: "الحلقة", en: "Episode" },
    previous: { ar: "السابق", en: "Previous" },
    next: { ar: "التالي", en: "Next" },
    of: { ar: "من", en: "of" },
    darkMode: { ar: "الوضع الداكن", en: "Dark mode" },
    lightMode: { ar: "الوضع الفاتح", en: "Light mode" },
    watchOnInstagram: { ar: "على إنستغرام", en: "On Instagram" },
    website: { ar: "الموقع الشخصي", en: "Website" },
    faqKicker: { ar: "أسئلة شائعة", en: "FAQ" },
    faqTitle: { ar: "قبل أن تنضموا", en: "Before you join" },
    navHome: { ar: "الرئيسية", en: "Home" },
    teamPageTitle: { ar: "الناس خلف سند", en: "The people behind SANAD" },
    teamPageText: {
      ar: "سند مجتمع يقوده طلاب متطوّعون. لكل فريق أهدافه وخطة عمله، ويتوزّع العمل بين المتطوّعين، وتتعاون الفرق فيما بينها.",
      en: "SANAD is run by student volunteers. Each team sets its own goals and plans, shares the work among its members, and collaborates with the other teams."
    },
    teamLead: { ar: "منسّق/ة الفريق", en: "Team lead" },
    teamEmpty: { ar: "هذا الفريق يرحّب بمتطوّعين جدد.", en: "This team welcomes new volunteers." },
    localTitle: { ar: "المنسّقون المحليون", en: "Local coordinators" },
    localText: {
      ar: "يبني المنسّقون المحليون مجتمع سند في جامعاتهم، وينظّمون نشاطاتها، ويبقون على تواصل مع الأعضاء.",
      en: "Local coordinators build the SANAD community at their university, organize its activities and stay in touch with members."
    },
    teamJoinTitle: { ar: "تريدون الانضمام لأحد الفرق؟", en: "Want to join a team?" },
    teamJoinText: {
      ar: "نشجّع كل عضو على أخذ المبادرة واقتراح مشاريع والتطوّع. نموذج التطوّع متاح داخل مجتمع سند على واتساب — سجّلوا في المجتمع أولًا وسنضيفكم.",
      en: "We encourage every member to take initiative, propose projects and volunteer. The volunteer form is shared in the SANAD WhatsApp community, so sign up first and we'll add you."
    },

    joinKicker: { ar: "انضموا إلينا", en: "Join us" },
    joinTitle: { ar: "مكانك معنا", en: "There's a place for you here" },
    joinText: {
      ar: "سواء كنت تفكّر بالدراسات العليا، أو في منتصف الدكتوراه، أو تبحث عن وظيفة أكاديمية — املأ نموذج التسجيل وسنضيفك إلى مجتمع سند على واتساب وإلى مجتمع جامعتك المحلي.",
      en: "Whether you're considering graduate school, in the middle of your PhD, or on the academic job market, fill in the sign-up form and we'll add you to the SANAD WhatsApp community and your university's local community."
    },
    joinForm: { ar: "سجّلوا في المجتمع", en: "Sign up to join" },
    joinWhatsapp: { ar: "انضموا عبر واتساب", en: "Join on WhatsApp" },
    volunteerTitle: { ar: "تطوّعوا معنا", en: "Volunteer with us" },
    volunteerText: {
      ar: "انضموا إلى أحد فرق المتطوّعين أو ساعدوا في بناء مجتمع جامعتكم. نموذج التطوّع متاح لأعضاء مجتمع سند على واتساب — سجّلوا أولًا وسنضيفكم.",
      en: "Join one of our volunteer teams or help build your university's community. The volunteer form is shared in the SANAD WhatsApp community, so sign up first and we'll add you."
    },
    volunteerCta: { ar: "أريد أن أتطوّع", en: "I want to volunteer" },
    contactInstagram: { ar: "راسلونا على إنستغرام", en: "Message us on Instagram" },
    contactEmail: { ar: "راسلونا بالبريد", en: "Email us" },

    findUsTitle: { ar: "تابعونا على", en: "Find us on" },
    findUsText: { ar: "أخبار المجتمع والفعاليات ومقابلات «باحث تحت المجهر».", en: "Community news, events and «Researcher in the Spotlight» interviews." },
    learnMore: { ar: "اعرفوا المزيد", en: "Learn more" },
    programsPageTitle: { ar: "مبادراتنا", en: "Our programs" },
    programsPageText: {
      ar: "من المجتمعات المحلية إلى الإرشاد والتطوير المهني — هذه المبادرات التي نبني بها سند. بعضها فعّال اليوم، وبعضها قيد التطوير أو ضمن خططنا القادمة.",
      en: "From local communities to mentorship and professional development, these are the ways we build SANAD. Some are running today; others are in development or part of our plans."
    },
    allPrograms: { ar: "كل المبادرات", en: "All programs" },
    otherPrograms: { ar: "مبادرات أخرى", en: "More programs" },
    programTeam: { ar: "الفريق المسؤول", en: "Team" },
    programUniversities: { ar: "الجامعات", en: "Universities" },
    programNotFound: { ar: "لم نجد هذه المبادرة.", en: "We couldn't find this program." },
    noteForming: {
      ar: "هذه المبادرة قيد التطوير. سجّلوا في المجتمع لتكونوا أول من يعرف عند إطلاقها.",
      en: "This program is in development. Sign up to the community to hear first when it launches."
    },
    notePlanned: {
      ar: "هذه المبادرة ضمن خططنا المستقبلية، ويسعدنا انضمامكم للمساهمة في بنائها.",
      en: "This program is part of our future plans, and we'd love your help building it."
    },
    ctaJoinTitle: { ar: "انضموا إلى سند", en: "Join SANAD" },
    ctaJoinText: { ar: "املأوا نموذج التسجيل وسنضيفكم إلى مجتمع سند على واتساب.", en: "Fill in the sign-up form and we'll add you to the SANAD WhatsApp community." },
    ctaContactTitle: { ar: "تواصلوا معنا", en: "Get in touch" },
    ctaContactText: { ar: "يسعدنا سماع أفكاركم واقتراحاتكم.", en: "We'd love to hear your ideas and suggestions." },
    spotlightEpisodes: { ar: "المقابلات", en: "Interviews" },
    spotlightEmpty: { ar: "شاهدوا المقابلات على صفحتنا في إنستغرام.", en: "Watch the interviews on our Instagram page." },
    spotlightWatch: { ar: "شاهدوا على إنستغرام", en: "Watch on Instagram" },
    footerTagline: { ar: "سند — لأن الطريق الأكاديمي أسهل مع بعض.", en: "SANAD — Building a stronger research community, together." },
    footerPartners: {
      ar: "مؤسسات ومبادرات مهتمة بالشراكة؟ يسعدنا التواصل.",
      en: "Institution or initiative interested in partnering? We'd love to hear from you."
    }
  },

  audience: [
    { ar: "طلاب الماجستير", en: "Master's students" },
    { ar: "طلاب الدكتوراه", en: "PhD students" },
    { ar: "باحثو ما بعد الدكتوراه", en: "Postdocs" },
    { ar: "أعضاء الهيئات التدريسية", en: "Faculty" },
    { ar: "المهتمون بالدراسات العليا", en: "Prospective grad students" }
  ],

  values: [
    { name: { ar: "الدعم المتبادل", en: "Mutual support" }, text: { ar: "نساعد بعضنا على تجاوز التحديات الأكاديمية والمهنية.", en: "Helping each other through academic and professional challenges." } },
    { name: { ar: "الانتماء", en: "Belonging" }, text: { ar: "علاقات حقيقية بين باحثين قد يشعرون بالعزلة في مؤسساتهم.", en: "Real connections between researchers who may feel isolated at their institutions." } },
    { name: { ar: "التعاون", en: "Collaboration" }, text: { ar: "تبادل المعرفة عبر التخصصات والجامعات.", en: "Sharing knowledge across disciplines and universities." } },
    { name: { ar: "التمكين", en: "Empowerment" }, text: { ar: "مهارات وثقة وعلاقات تصنع النجاح.", en: "Skills, confidence and connections to succeed." } },
    { name: { ar: "التمثيل", en: "Representation" }, text: { ar: "حضور أوضح للباحثات والباحثين العرب في الأكاديميا.", en: "Greater visibility for Arab researchers in academia." } },
    { name: { ar: "الإتاحة", en: "Accessibility" }, text: { ar: "معلومات وإرشاد وفرص في متناول الجميع.", en: "Information, mentorship and opportunities within reach." } },
    { name: { ar: "التطوّع", en: "Volunteerism" }, text: { ar: "مجتمع مستدام بمسؤولية ومبادرة جماعية.", en: "A sustainable community built on shared responsibility." } }
  ],

  communities: [
    {
      name: { ar: "معهد وايزمان للعلوم", en: "Weizmann Institute of Science" },
      short: { ar: "وايزمان", en: "Weizmann" },
      status: "active",
      note: { ar: "المجتمع الأول — نشاطات مستمرة.", en: "The original community, with ongoing activities." },
      coordinators: [] // TODO: e.g. [{ name: { ar: "الاسم", en: "Name" }, photo: "images/team/name.jpg", link: "" }]
    },
    {
      name: { ar: "جامعة تل أبيب", en: "Tel Aviv University" },
      short: { ar: "تل أبيب", en: "TAU" },
      status: "active",
      note: { ar: "مجتمع محلي فعّال.", en: "Active local community." },
      coordinators: []
    },
    {
      name: { ar: "الجامعة العبرية في القدس", en: "Hebrew University of Jerusalem" },
      short: { ar: "العبرية", en: "HUJI" },
      status: "active",
      note: { ar: "لقاءات ومحاضرات ضيوف.", en: "Meetings and invited lectures." },
      coordinators: []
    },
    {
      name: { ar: "معهد التخنيون", en: "Technion" },
      short: { ar: "التخنيون", en: "Technion" },
      status: "forming",
      note: { ar: "تأسّس فريق التنظيم المحلي.", en: "Local organizing team established." },
      coordinators: []
    },
    {
      name: { ar: "جامعة بن غوريون", en: "Ben-Gurion University" },
      short: { ar: "بن غوريون", en: "BGU" },
      status: "forming",
      note: { ar: "تأسّس فريق التنظيم المحلي.", en: "Local organizing team established." },
      coordinators: []
    }
  ],

  /*
    Programs. Each one appears on programs.html and gets its own page: program.html?p=<id>
      status:   "active" | "forming" | "planned"
      text:     short description for cards
      intro:    longer description at the top of the program page
      sections: lists shown on the program page
      team:     id of the responsible team (see "teams" below), optional
      showCommunities / showVideos: show the universities / «باحث تحت المجهر» videos on the page
      cta:      "join" (sign-up form) or "contact" (Instagram + email); ctaTitle / ctaText override the default box text,
                ctaLink: { href, label } replaces the main button
      announcement: optional highlighted box at the top { badge, title, text, link, label, poster }
  */
  programs: [
    {
      id: "communities",
      icon: "community",
      status: "active",
      name: { ar: "المجتمعات المحلية", en: "Local communities" },
      text: { ar: "لقاءات شهرية، أمسيات تعارف، محاضرات ضيوف، ورشات ونشاطات اجتماعية في كل جامعة.", en: "Monthly gatherings, networking evenings, invited talks, workshops and social activities at each university." },
      intro: {
        ar: "في كل جامعة يبني سند مجتمعًا محليًا يقوده منسّقون من الطلاب والباحثين. المجتمعات المحلية هي قلب سند: فيها نلتقي ونتعارف ونتعلّم من بعضنا، ونبني علاقات تتجاوز حدود مجموعات البحث. وجميعها مترابطة عبر مجتمع سند.",
        en: "At each university, SANAD builds a local community led by student and researcher coordinators. Local communities are the heart of SANAD: where we meet, learn from each other and build connections beyond our research groups. All of them are connected through the SANAD community."
      },
      sections: [
        {
          title: { ar: "ماذا يحدث في المجتمعات المحلية؟", en: "What happens in local communities?" },
          items: [
            { ar: "لقاءات شهرية غير رسمية", en: "Informal monthly gatherings" },
            { ar: "أمسيات تعارف وتشبيك", en: "Networking evenings" },
            { ar: "محاضرات ضيوف لباحثين عرب", en: "Invited talks by Arab researchers" },
            { ar: "ورشات علمية، مثل ورشة التخمير في معهد وايزمان", en: "Scientific workshops, like the fermentation workshop at Weizmann" },
            { ar: "نشاطات اجتماعية وثقافية", en: "Social and cultural activities" }
          ]
        }
      ],
      showCommunities: true,
      // Photos from local community activities (images/gallery/). TODO: replace the repeated placeholder with the real set
      gallery: [
        "images/gallery/monthly-meeting-1.jpg",
        "images/gallery/monthly-meeting-1.jpg",
        "images/gallery/monthly-meeting-1.jpg",
        "images/gallery/monthly-meeting-1.jpg"
      ],
      team: "meetups",
      cta: "join"
    },
    {
      id: "mentorship",
      icon: "mentor",
      status: "active",
      name: { ar: "سندك — برنامج الإرشاد", en: "Sanadak — Mentorship" },
      text: { ar: "برنامج إرشاد أكاديمي شخصي يربط طلاب الماجستير الجدد بمرشدين من طلاب الدكتوراه وباحثي ما بعد الدكتوراه. التسجيل مفتوح للعام 2026–2027.", en: "A personal academic mentorship program pairing new Master's students with PhD and postdoc mentors. Registration is open for 2026–2027." },
      intro: {
        ar: "«سندك» هو برنامج الإرشاد الأكاديمي الشخصي من مجتمع سند. نربط طلاب وطالبات الماجستير الجدد بمرشدين ومرشدات من مراحل أكاديمية متقدّمة، مثل طلاب الدكتوراه وباحثي ما بعد الدكتوراه، ليشاركوهم تجاربهم وخبراتهم ويكونوا سندًا لهم في بداية مشوارهم الأكاديمي. لأن كل بداية جديدة بحاجة إلى سند.",
        en: "Sanadak is SANAD's personal academic mentorship program. We pair new Master's students with mentors at more advanced stages, such as PhD students and postdocs, who share their experience and support them at the start of their academic journey. Because every new beginning needs a sanad."
      },
      announcement: {
        badge: { ar: "التسجيل مفتوح", en: "Registration open" },
        title: { ar: "انطلق الفوج الأول: طلاب الماجستير الجدد 2026–2027", en: "First cohort: new Master's students, 2026–2027" },
        text: {
          ar: "هل أنت طالب/ة في السنة الأولى من الماجستير للعام الدراسي 2026–2027 في أحد مجالات العلوم والتكنولوجيا والهندسة والرياضيات؟ انضم/ي إلى «سندك» واحصل/ي على إرشاد أكاديمي شخصي.",
          en: "Are you in the first year of a Master's degree in a STEM field for 2026–2027? Join Sanadak and get personal academic mentoring."
        },
        link: "https://forms.gle/gR5cryMK3obGCvY98",
        label: { ar: "سجّل/ي الآن", en: "Register now" },
        poster: "images/programs/sanadak-poster.jpg"
      },
      sections: [
        {
          title: { ar: "ماذا يقدّم البرنامج؟", en: "What the program offers" },
          items: [
            { ar: "إرشاد أكاديمي شخصي من طلاب وباحثين ذوي خبرة", en: "Personal academic mentoring from experienced students and researchers" },
            { ar: "مساعدة في تجاوز تحديات البحث والتأقلم مع الحياة الأكاديمية", en: "Help with research challenges and adjusting to academic life" },
            { ar: "مساحة لطرح الأسئلة والتشاور والاستفادة من تجارب الآخرين", en: "A space to ask, consult and learn from others' experience" }
          ]
        },
        {
          title: { ar: "عمّ يمكن أن تسأل؟", en: "What can you ask about?" },
          items: [
            { ar: "البحث العلمي", en: "Research" },
            { ar: "العلاقة مع المشرف/ة", en: "Working with your supervisor" },
            { ar: "التحديات الأكاديمية", en: "Academic challenges" },
            { ar: "الخطوات القادمة في المسيرة الأكاديمية", en: "Your next academic steps" }
          ]
        },
        {
          title: { ar: "لمن البرنامج؟", en: "Who is it for?" },
          items: [
            { ar: "الطلاب والطالبات العرب الذين بدأوا الماجستير في العام الدراسي 2026–2027", en: "Arab students who started a Master's degree in 2026–2027" },
            { ar: "في مجالات العلوم والتكنولوجيا والهندسة والرياضيات (STEM)", en: "In science, technology, engineering and mathematics (STEM)" }
          ]
        },
        {
          title: { ar: "مسارات نخطّط لها لاحقًا", en: "Tracks we plan to add" },
          items: [
            { ar: "طلاب ألقاب متقدّمة يرشدون طلاب البكالوريوس المعنيّين بالماجستير", en: "Advanced-degree students mentoring undergraduates interested in a Master's degree" },
            { ar: "باحثو ما بعد الدكتوراه يرشدون طلاب دكتوراه مهتمين بما بعد الدكتوراه", en: "Postdocs mentoring PhD students interested in postdoctoral positions" },
            { ar: "أعضاء هيئة تدريسية يرشدون باحثين يستعدّون لمسيرة أكاديمية", en: "Faculty mentoring researchers preparing for academic careers" }
          ]
        }
      ],
      team: "mentorship",
      cta: "join",
      ctaTitle: { ar: "لأن كل بداية جديدة بحاجة إلى سند", en: "Because every new beginning needs a sanad" },
      ctaText: { ar: "التسجيل للفوج الأول من «سندك» مفتوح الآن لطلاب الماجستير الجدد.", en: "Registration for Sanadak's first cohort is open now for new Master's students." },
      ctaLink: { href: "https://forms.gle/gR5cryMK3obGCvY98", label: { ar: "سجّل/ي في «سندك»", en: "Register for Sanadak" } }
    },
    {
      id: "spotlight",
      icon: "spotlight",
      status: "active",
      name: { ar: "باحث تحت المجهر", en: "Researcher in the Spotlight" },
      text: { ar: "مقابلات ومحتوى يسلّط الضوء على باحثات وباحثين عرب وإنجازاتهم ومسيرتهم، لإلهام الأجيال القادمة.", en: "Interviews and stories highlighting Arab researchers, their achievements and journeys, to inspire the next generation." },
      intro: {
        ar: "مبادرة تسلّط الضوء على باحثات وباحثين عرب: إنجازاتهم العلمية، وتجاربهم الأكاديمية، ومسيرتهم الشخصية — لزيادة حضور العلماء العرب وإلهام الأجيال القادمة.",
        en: "An initiative highlighting Arab researchers: their scientific achievements, academic experiences and personal journeys, to increase the visibility of Arab scientists and inspire the next generation."
      },
      sections: [],
      showVideos: true,
      cta: "contact",
      ctaTitle: { ar: "تعرفون باحثًا أو باحثة يستحقون الضوء؟", en: "Know a researcher who deserves the spotlight?" },
      ctaText: { ar: "راسلونا واقترحوا اسمًا لمقابلة قادمة.", en: "Get in touch and suggest someone for a future interview." }
    },
    {
      id: "development",
      icon: "growth",
      status: "active",
      name: { ar: "التطوير الأكاديمي والمهني", en: "Academic & professional development" },
      text: { ar: "ندوات حول الدكتوراه وورشات عملية، مثل استخدام أدوات الذكاء الاصطناعي في البحث العلمي، ترافق الباحثات والباحثين في كل مرحلة.", en: "PhD panels and hands-on workshops, such as using AI tools in research, for every stage of an academic path." },
      intro: {
        ar: "ننظّم ونخطّط فعاليات تعليمية ترافق الباحثات والباحثين في كل مرحلة من مسيرتهم الأكاديمية، من التفكير بالدراسات العليا وحتى التقديم لوظائف أكاديمية.",
        en: "We organize and plan educational events for every stage of an academic path, from considering graduate school to applying for faculty positions."
      },
      sections: [
        {
          title: { ar: "ما قمنا به", en: "What we've done" },
          items: [
            { ar: "ورشة حول استخدام أدوات الذكاء الاصطناعي في البحث العلمي", en: "A workshop on using AI tools in research" },
            { ar: "ندوات حول الدكتوراه", en: "Panels about doing a PhD" }
          ]
        },
        {
          title: { ar: "ما نخطّط له", en: "What we're planning" },
          items: [
            { ar: "ندوات حول الماجستير وما بعد الدكتوراه", en: "Panels on Master's studies and postdocs" },
            { ar: "سوق العمل الأكاديمي والتقديم لوظائف هيئة تدريسية", en: "The academic job market and faculty applications" },
            { ar: "كتابة السيرة الذاتية", en: "CV writing" },
            { ar: "عرض الأبحاث والتواصل العلمي", en: "Presenting and communicating research" },
            { ar: "جلسات يعرض فيها الباحثون أبحاثهم ويعرّفون بأنفسهم", en: "Sessions where researchers present their work and introduce themselves" }
          ]
        }
      ],
      cta: "join"
    },
    {
      id: "partnerships",
      icon: "handshake",
      status: "active",
      name: { ar: "الشراكات والتواصل", en: "Partnerships & outreach" },
      text: { ar: "شراكات مع مؤسسات أكاديمية وتعليمية ومبادرات مجتمعية، لسدّ الفجوة بين البكالوريوس والبحث والمسيرة الأكاديمية.", en: "Partnerships with academic and educational institutions and community initiatives, bridging undergraduate studies, research and academic careers." },
      intro: {
        ar: "نسعى إلى شراكات مع مؤسسات أكاديمية وتعليمية وباحثين ومبادرات مجتمعية، لنسدّ الفجوة بين البكالوريوس والبحث العلمي والمسيرة الأكاديمية، ونزيد الوعي بالفرص المتاحة.",
        en: "We seek partnerships with academic and educational institutions, researchers and community initiatives, to bridge the gap between undergraduate studies, research and academic careers, and raise awareness of available opportunities."
      },
      sections: [
        {
          title: { ar: "مع من نتعاون؟", en: "Who we work with" },
          items: [
            { ar: "مؤسسات أكاديمية", en: "Academic institutions" },
            { ar: "منظمات تعليمية", en: "Educational organizations" },
            { ar: "باحثات وباحثون", en: "Researchers" },
            { ar: "مبادرات مجتمعية", en: "Community initiatives" }
          ]
        }
      ],
      cta: "contact",
      ctaTitle: { ar: "مهتمون بالشراكة؟", en: "Interested in partnering?" },
      ctaText: { ar: "يسعدنا التواصل مع مؤسسات ومبادرات تشاركنا الرؤية.", en: "We'd love to hear from institutions and initiatives that share our vision." }
    },
    {
      id: "networking",
      icon: "network",
      status: "planned",
      name: { ar: "التشبيك والتعاون", en: "Networking & collaboration" },
      text: { ar: "نخطّط لربط باحثات وباحثين عرب من مختلف التخصصات والمؤسسات، لتشجيع التعاون وبناء شبكة مهنية داعمة.", en: "We plan to connect Arab researchers across disciplines and institutions to encourage collaboration and build a supportive professional network." },
      intro: {
        ar: "نخطّط لربط باحثات وباحثين عرب من مختلف التخصصات والمؤسسات، لتشجيع التعاون وتبادل المعرفة وبناء شبكة مهنية داعمة.",
        en: "We plan to connect Arab researchers across disciplines and institutions to encourage collaboration, knowledge-sharing and a supportive professional network."
      },
      sections: [
        {
          title: { ar: "ما نخطّط له", en: "What we plan" },
          items: [
            { ar: "شبكة لباحثي ما بعد الدكتوراه العرب", en: "A network for Arab postdoctoral researchers" },
            { ar: "لقاءات شهرية عبر الإنترنت لباحثي ما بعد الدكتوراه", en: "Monthly online meetings for postdocs" },
            { ar: "لقاءات تشبيك محلية وقطرية", en: "Local and national networking gatherings" },
            { ar: "ربط بين باحثين ذوي اهتمامات بحثية مشتركة", en: "Connecting researchers with shared research interests" },
            { ar: "فرص للقاء علماء عرب ذوي خبرة", en: "Opportunities to meet established Arab scientists" }
          ]
        }
      ],
      cta: "join"
    },
    {
      id: "directory",
      icon: "directory",
      status: "planned",
      name: { ar: "دليل أعضاء سند", en: "SANAD member directory" },
      text: { ar: "قاعدة بيانات لأعضاء المجتمع، يمكن البحث فيها حسب المجال أو الجامعة أو المرحلة الأكاديمية، لإيجاد شركاء للتعاون ومن يمكن الاستشارة معهم.", en: "A searchable database of community members, by field, university or academic stage, to find collaborators and people to consult." },
      intro: {
        ar: "نخطّط لبناء دليل لأعضاء مجتمع سند: صفحة تعريفية قصيرة لكل عضو وعضوة، يمكن البحث فيها حسب المجال أو الجامعة أو المرحلة الأكاديمية. هدفه أن يسهّل على الباحثات والباحثين العثور على بعضهم البعض، للتعاون أو للاستشارة أو لتبادل التجارب.",
        en: "We plan to build a directory of SANAD members: a short profile for each member, searchable by field, university or academic stage. The goal is to make it easy for researchers to find each other, to collaborate, ask for advice or share experiences."
      },
      sections: [
        {
          title: { ar: "ما الفكرة؟", en: "The idea" },
          items: [
            { ar: "صفحة تعريفية لكل عضو/ة: الجامعة، المرحلة الأكاديمية، المجال والاهتمامات البحثية", en: "A profile for each member: university, academic stage, field and research interests" },
            { ar: "بحث حسب المجال أو الجامعة أو المرحلة الأكاديمية", en: "Search by field, university or academic stage" },
            { ar: "إيجاد شركاء للتعاون، ومرشدين، ومن مرّ بتجربة مشابهة", en: "Find collaborators, mentors and people who've been through a similar path" }
          ]
        },
        {
          title: { ar: "الخصوصية", en: "Privacy" },
          items: [
            { ar: "الانضمام إلى الدليل اختياري", en: "Joining the directory is optional" },
            { ar: "كل عضو/ة يقرّر ما يظهر في صفحته/ا", en: "Each member decides what appears on their profile" }
          ]
        }
      ],
      cta: "contact",
      ctaTitle: { ar: "تريدون المساهمة في بنائه؟", en: "Want to help build it?" },
      ctaText: { ar: "إن كانت لديكم أفكار أو خبرة في بناء مثل هذه الأدوات، يسعدنا تواصلكم.", en: "If you have ideas or experience building tools like this, we'd love to hear from you." }
    }
  ],

  /*
    Frequently asked questions (homepage, under "Join us").
    link is optional: { href: "...", label: { ar: "...", en: "..." } }. Use "joinForm" as href for the sign-up form.
  */
  faq: [
    {
      q: { ar: "من يمكنه الانضمام إلى سند؟", en: "Who can join SANAD?" },
      a: { ar: "طلاب وطالبات الماجستير والدكتوراه، وباحثو ما بعد الدكتوراه، وأعضاء الهيئات التدريسية العرب في الجامعات والمؤسسات البحثية في البلاد، وكذلك من يفكّرون بالتوجّه إلى الدراسات العليا.", en: "Arab Master's and PhD students, postdocs and faculty at universities and research institutions in Israel, as well as anyone considering graduate studies." }
    },
    {
      q: { ar: "ما المجالات التي يغطّيها سند؟", en: "Which fields does SANAD cover?" },
      a: { ar: "يغطّي سند جميع مجالات العلوم والتكنولوجيا: علوم الحاسوب، الرياضيات، الفيزياء، الكيمياء، الأحياء، الطب، الهندسة والمجالات القريبة منها.", en: "SANAD covers all STEM fields: computer science, mathematics, physics, chemistry, biology, medicine, engineering and related areas." }
    },
    {
      q: { ar: "أنا طالب/ة بكالوريوس، هل يمكنني الانضمام؟", en: "I'm an undergraduate. Can I join?" },
      a: { ar: "نعم، إن كنت تفكّر بالدراسات العليا أو بمسيرة بحثية. من أهدافنا سدّ الفجوة بين البكالوريوس والبحث العلمي، وستجد في سند من يجيب عن أسئلتك.", en: "Yes, if you're considering graduate studies or a research career. Bridging the gap between undergraduate studies and research is one of our goals, and you'll find people happy to answer your questions." }
    },
    {
      q: { ar: "ماذا يحدث بعد أن أملأ نموذج التسجيل؟", en: "What happens after I fill in the sign-up form?" },
      a: { ar: "نضيفك إلى مجتمع سند على واتساب، حيث نعلن عن الفعاليات ونتواصل ونتشارك الفرص، ونعرّفك على مجتمع جامعتك المحلي إن وُجد.", en: "We add you to the SANAD WhatsApp community, where we announce events, talk and share opportunities, and connect you with your university's local community if there is one." },
      link: { href: "joinForm", label: { ar: "سجّلوا في المجتمع", en: "Sign up to join" } }
    },
    {
      q: { ar: "هل الانضمام مجاني؟", en: "Is it free to join?" }, // TODO: confirm
      a: { ar: "نعم. سند مجتمع تطوّعي يقوده الطلاب، والانضمام إليه مجاني.", en: "Yes. SANAD is a volunteer, student-led community, and joining is free." }
    },
    {
      q: { ar: "جامعتي ليست في القائمة، ماذا أفعل؟", en: "My university isn't listed. What can I do?" },
      a: { ar: "انضموا إلينا على أي حال! سند يتوسّع باستمرار، وإن كنتم مهتمين ببناء مجتمع محلي في جامعتكم فتواصلوا معنا وسنساعدكم في البداية.", en: "Join anyway! SANAD keeps growing, and if you'd like to build a local community at your university, get in touch and we'll help you get started." }
    },
    {
      q: { ar: "كيف أتطوّع في سند؟", en: "How can I volunteer?" },
      a: { ar: "نموذج التطوّع متاح داخل مجتمع سند على واتساب. سجّلوا في المجتمع أولًا، ثم اختاروا الفريق الذي يناسبكم: التواصل الاجتماعي، اللقاءات الشهرية أو الإرشاد الأكاديمي.", en: "The volunteer form is shared in the SANAD WhatsApp community. Sign up first, then pick the team that suits you: social media, monthly meetups or academic mentoring." },
      link: { href: "team.html", label: { ar: "تعرّفوا على الفرق", en: "Meet the teams" } }
    },
    {
      q: { ar: "كيف أقترح باحثًا أو باحثة لـ«باحث تحت المجهر»؟", en: "How do I suggest someone for «Researcher in the Spotlight»?" },
      a: { ar: "راسلونا على إنستغرام أو بالبريد الإلكتروني، وأخبرونا عن الباحث/ة ولماذا تستحق قصتهم أن تُروى.", en: "Message us on Instagram or by email, and tell us about the researcher and why their story deserves to be told." },
      link: { href: "program.html?p=spotlight", label: { ar: "باحث تحت المجهر", en: "Researcher in the Spotlight" } }
    },
    {
      q: { ar: "نحن مؤسسة أو مبادرة ونريد التعاون مع سند", en: "We're an institution or initiative and want to work with SANAD" },
      a: { ar: "يسعدنا ذلك! نسعى إلى بناء شراكات مع مؤسسات أكاديمية وتعليمية ومبادرات مجتمعية. راسلونا بالبريد الإلكتروني.", en: "We'd love that! We build partnerships with academic and educational institutions and community initiatives. Email us to start the conversation." },
      link: { href: "program.html?p=partnerships", label: { ar: "الشراكات والتواصل", en: "Partnerships & outreach" } }
    }
  ],

  /*
    Events. Add new ones at the top of "upcoming".
    date: "YYYY-MM-DD" (optional for past events). link: registration URL (optional).
  */
  events: {
    upcoming: [
      // { date: "2026-11-20", title: { ar: "...", en: "..." }, place: { ar: "...", en: "..." }, text: { ar: "...", en: "..." }, link: "" }
    ],
    past: [
      {
        title: { ar: "ورشة التخمير", en: "Fermentation workshop" },
        place: { ar: "معهد وايزمان", en: "Weizmann Institute" },
        text: { ar: "ورشة علمية-اجتماعية جمعت أعضاء المجتمع.", en: "A hands-on scientific and social workshop for community members." }
      },
      {
        title: { ar: "محاضرات ضيوف لباحثين عرب", en: "Invited talks by Arab researchers" },
        place: { ar: "الجامعة العبرية ووايزمان", en: "Hebrew University & Weizmann" },
        text: { ar: "باحثون عرب يشاركون أبحاثهم وتجاربهم الأكاديمية.", en: "Arab researchers sharing their work and academic experiences." }
      },
      {
        title: { ar: "لقاءات شهرية لباحثي ما بعد الدكتوراه", en: "Monthly postdoc meetups" },
        place: { ar: "عبر الإنترنت", en: "Online" },
        text: { ar: "لقاء شهري مستمر لشبكة باحثي ما بعد الدكتوراه العرب.", en: "An ongoing monthly meeting of the Arab postdoc network." }
      }
    ]
  },

  /*
    «باحث تحت المجهر» interviews (shown on the program page: program.html?p=spotlight), newest first.
    video: a YouTube link (video, Shorts or youtu.be) or an Instagram reel/post link, e.g.
      "https://www.youtube.com/watch?v=ABC123", "https://youtube.com/shorts/ABC123",
      "https://www.instagram.com/reel/ABC123/"
    name / field / affiliation are optional captions.
  */
  spotlight: [
    { video: "https://www.instagram.com/reel/DRVJXmICAzO/" },
    { video: "https://www.instagram.com/reel/DSfdAnjiEts/" },
    { video: "https://www.instagram.com/reel/DTntoTmiOKV/" },
    // { video: "https://www.youtube.com/watch?v=ABC123", name: { ar: "...", en: "..." }, field: { ar: "...", en: "..." }, affiliation: { ar: "...", en: "..." } }
  ],

  founder: { photo: "images/team/fadi.jpg", link: "https://fadikhatib.github.io", name: { ar: "فادي خطيب", en: "Fadi Khatib" }, affiliation: { ar: "معهد وايزمان للعلوم", en: "Weizmann Institute of Science" } },

  /*
    Volunteer teams (shown on team.html).
    To add a volunteer, add an entry to "members":
      { name: { ar: "الاسم", en: "Name" }, role: { ar: "...", en: "..." }, affiliation: { ar: "...", en: "..." }, link: "", photo: "images/team/name.jpg" }
    link: personal website or LinkedIn profile (optional). LinkedIn links get a LinkedIn icon, others a globe icon.
    Only "name" is required. A plain string also works: { name: "سنا" }.
    Photos: put the image in images/team/ (square, at least 400×400 px, .jpg) and set
    photo: "images/team/<file>.jpg". Without a photo, the person's initial is shown.
    Local university coordinators are listed under "communities" above.
  */
  teams: [
    {
      id: "social",
      name: { ar: "التواصل الاجتماعي", en: "Social media" },
      text: { ar: "يدير حضور سند على إنستغرام ولينكدإن، وينشر أخبار المجتمع وفعالياته ومحتواه.", en: "Runs SANAD's Instagram and LinkedIn, sharing community news, events and content." },
      lead: { name: { ar: "سنا خطيب", en: "Sana Khatib" }, affiliation: { ar: "معهد وايزمان للعلوم", en: "Weizmann Institute of Science" }, photo: "", link: "https://www.linkedin.com/in/sana-khatib/" },
      members: [
        { name: { ar: "جولان ناصر", en: "Jolan Nassir" }, affiliation: { ar: "معهد وايزمان للعلوم", en: "Weizmann Institute of Science" }, photo: "", link: "https://www.linkedin.com/in/jolan-nassir-320b3123b/" },
        { name: { ar: "جونا خطيب", en: "Juna Khatib" }, affiliation: { ar: "معهد وايزمان للعلوم", en: "Weizmann Institute of Science" }, photo: "", link: "https://www.linkedin.com/in/juna-khatib-2b388034a/" },
        { name: { ar: "سليمة أبو ربيع", en: "Salima Abu Rabe'a" }, affiliation: { ar: "جامعة تل أبيب", en: "Tel Aviv University" }, photo: "", link: "https://www.linkedin.com/in/salimaaburabea/" },
        { name: { ar: "عدن ميعاري", en: "Adan Miari" }, affiliation: { ar: "جامعة تل أبيب", en: "Tel Aviv University" }, photo: "", link: "https://www.linkedin.com/in/adan-miari/" },
        { name: { ar: "ديما خطيب", en: "Dima Khatib" }, affiliation: { ar: "الجامعة العبرية في القدس", en: "Hebrew University of Jerusalem" }, photo: "", link: "https://www.linkedin.com/in/dima-khatib-87a444434/" },
        { name: { ar: "شهد شيوخي", en: "Shahd Ashouokhi" }, affiliation: { ar: "معهد وايزمان للعلوم", en: "Weizmann Institute of Science" }, photo: "", link: "https://www.linkedin.com/in/shahd-ashouokhi-59b595160/" }
      ]
    },
    {
      id: "meetups",
      name: { ar: "اللقاءات الشهرية", en: "Monthly meetups" },
      text: { ar: "ينظّم اللقاءات الشهرية التي تجمع أعضاء المجتمع للتعارف والحديث وتبادل التجارب.", en: "Organizes the monthly gatherings where members meet, talk and share experiences." },
      lead: { name: { ar: "جنان حجاجرة", en: "Jenan Hajajra" }, affiliation: { ar: "جامعة تل أبيب", en: "Tel Aviv University" }, photo: "images/team/jenan.jpg", link: "https://www.linkedin.com/in/jenan-hajajra-98445627b/" },
      members: [
        { name: { ar: "دنيا خوري", en: "Donya Khoury" }, affiliation: { ar: "جامعة تل أبيب", en: "Tel Aviv University" }, photo: "images/team/donya.jpg", link: "https://www.linkedin.com/in/donya-khoury-a03063280/" },
        { name: { ar: "عرين عويسات", en: "Areen Awesat" }, affiliation: { ar: "معهد وايزمان للعلوم", en: "Weizmann Institute of Science" }, photo: "", link: "https://www.linkedin.com/in/areen-awesat-867693409/" }, // TODO: confirm Arabic spelling
        { name: { ar: "محمود أبو رميلة", en: "Mahmoud Abu-Rmilah" }, affiliation: { ar: "معهد وايزمان للعلوم", en: "Weizmann Institute of Science" }, photo: "", link: "" }
      ]
    },
    {
      id: "mentorship",
      name: { ar: "الإرشاد الأكاديمي", en: "Academic mentoring" },
      text: { ar: "يطوّر برنامج «سندك» الذي يربط بين باحثين في مراحل أكاديمية مختلفة.", en: "Develops Sanadak, the program connecting researchers at different career stages." },
      lead: { name: { ar: "ريما صغير", en: "Rima Sghayer" }, affiliation: { ar: "جامعة تل أبيب", en: "Tel Aviv University" }, photo: "", link: "https://www.linkedin.com/in/rima-sghayer-0b1292316/" },
      members: []
    },
    {
      id: "other",
      name: { ar: "متطوّعون آخرون", en: "Other volunteers" },
      text: { ar: "متطوّعون يساهمون في مشاريع ومبادرات مختلفة في سند.", en: "Volunteers contributing to various SANAD projects and initiatives." },
      lead: null,
      members: []
    }
  ]
};
