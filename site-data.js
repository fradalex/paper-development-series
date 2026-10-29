/* Edit or delete any session below. Add new ones as { date: "YYYY-MM-DD", speaker: "Name", title: "Paper title" }. Entries with TBD details expire after their date; completed sessions move to the archive. */
window.PDS_DATA = {
  email: "info@paperdevelopmentseries.org", // Public contact address and contact form destination
  proposalUrl: "", // Optional Google Form or other submission link; use a full https:// URL
  // Replace each placeholder with a name, a short bio, and an optional photo path.
  // Upload portraits beside index.html in this repository; for example photo: "alex-smith.jpg".
  // Add or delete { name, photo, bio } rows to change the number of organisers.
  // Optional: website: "https://..." adds a link to the person's biography card.
  organisers: [
    { name: "Stefano Azzolina", photo: "sa-pic.JPG", website: "https://www.santannapisa.it/en/stefano-azzolina", bio: "Originally from Sicily, Stefano Azzolina is a PhD candidate in Economics at the Sant'Anna School for Advanced Studies in Pisa, Italy. He is currently studying the digital ecosystem, its organization and control from both a theoretical and empirical perspective. His main research interests lies at the intersection of organization theory and innovation studies, adopting a complex evolving perspective to study power in economics, looking  for connections with antitrust and industrial policymaking." },
    { name: "Mariavittoria Castellucci", photo: "mc_pic.JPG", bio: "Mariavittoria Castellucci is a PhD candidate in Economics and Management of Innovation and Sustainability at the University of Parma, in a joint program with the University of Ferrara and the Catholic University of the Sacred Heart in Piacenza. Her research explores innovation, higher education, and environmental issues from an economic perspective. She studied Economics at the University of Ferrara, where she completed both her Bachelor’s and Master’s degrees, specializing in Green Economy and Sustainability at the Master’s level and graduating with 110/110 cum laude. She is also a member of RESKILL (REsearch, SKills, Innovation and Labour Lab), a research group investigating the links between innovation, skills, and labour market dynamics. During her PhD, she was a visiting researcher at Università della Corsica Pasquale Paoli and Université Côte d’Azur." },
    { name: "Ester Cipi", photo: "ec_pic.JPG", bio: "Originally from Rome, Ester Cipi is a PhD candidate in Economics and Finance in the joint programme of the University of Trento and the free University of Bozen-Bolzano, Italy. Her research interests lie at the intersection of environmental economics, energy economics and macroeconomics. Combining empirical analysis and macroeconomic modelling, she studies how climate policies interact with energy markets and shape economic outcomes, with a particular focus on the EU Emissions Trading System, fossil fuel prices and the energy mix." },
    { name: "Francesco D'Alessandro", photo: "fd_pic.PNG", bio: "Francesco D’Alessandro is a researcher in economics of innovation and technology management. His work examines the economic implications of artificial intelligence for regions, firms, and individuals, including its role in decision-making processes. He holds a Ph.D. in Management and Innovation from the Catholic University of the Sacred Heart. His doctoral research combined econometric analysis and deep learning–based patent classification to identify and measure AI developments across time and space, and examine how AI reshapes firm dynamics and knowledge creation in Europe. His broader interests include the conditions shaping technology diffusion and its economic impact, alongside the challenges facing industrial policy in a global economy marked by growing geopolitical and trade tensions."},
    { name: "Stefano Fusinato", photo: "sf_pic.JPG", bio: "Stefano Fusinato is a PhD candidate in Economics and Finance at the University of Trento and the Free University of Bozen-Bolzano, Italy. His research interests lie in applied microeconomics, with a particular focus on public economics and the economics of (organized) crime. His dissertation brings these interests together by exploring the relationship between public procurement and organized crime." },
    { name: "Arsla Khalid", photo: "ak_pic.JPG", bio: "Arsla Khalid is a PhD scholar in Economic Geography and Regional Science at the Gran Sasso Science Institute (GSSI) in L’Aquila, Italy. She also holds a PNRR-funded research scholarship focused on the twin transition, with particular emphasis on complex twin-transition technologies. Her research explores the economic geography of the twin transition, its environmental trade-offs, and the role of regional institutional quality in shaping the development of complex twin technologies. Methodologically, she integrates econometric methods with computational techniques, leveraging large-scale patent and trademark data alongside regional socioeconomic and institutional datasets to investigate the spatial dynamics of twin-transition technological innovation." },
    { name: "Andrea Marini", photo: "am_pic.JPG", bio: "Andrea is an interdisciplinary researcher in applied economics and economic sociology, focusing on the social and environmental sustainability of work and production. He holds a PhD in Economics from the University of Parma and the University of Ferrara. His current research uses a survey experiment to measure how workers value the environmental characteristics of jobs and firms as a dimension of job quality in the green transition, and studies whether firms' green patents and trademarks improve their environmental performance. His earlier work examined how digital platforms and algorithmic management reshape work, with particular attention to precarity and decent work, collective bargaining, and the experiences of vulnerable and migrant workers. He combines expertise in experimental methods (discrete choice experiments, survey design) and microeconometrics (causal inference, difference-in-differences, panel data)  with complementary training in qualitative fieldwork (ethnography and interviews) from his background in the political and social sciences." },
    { name: "Gilvan Rosário Jr.", photo: "gr_pic.JPG", bio: "Originally from Brazil, Gilvan Santos do Rosario Junior is a PhD candidate in Regional Science and Economic Geography at the Gran Sasso Science Institute in L’Aquila, Italy. His research looks at the local environmental consequences of the global demand for minerals, with a focus on Brazil. He studies how mining titles move through the regulatory sequence, from exploration to extraction, and when land clearing actually begins. His work also asks whether the effects differ for critical and strategic raw materials central to the green and digital transitions, and whether foreign ownership changes environmental outcomes. His broader interests include the spatial organisation of economic activity, territorial inequalities and quantitative methods for regional analysis. His Master’s research on the spatial distribution of agribusiness in Brazil’s Midwest led to a methods paper in Geographical Analysis." },
    { name: "Rahmi Can Yamanoğlu", photo: "rahmi-can-yamanoglu.jpg", website: "https://rcyamanoglu.com", bio: "Rahmi Can Yamanoğlu is a PhD candidate in economic geography and regional science at the Gran Sasso Science Institute in L'Aquila, Italy, working on the geography of innovation and on how institutional and intellectual property frameworks shape innovation dynamics across regions. The research focuses on inclusive forms of innovation and on the social side of innovation: how institutions, social relations and gender shape who innovates and where. It combines econometric analysis and computational methods with large-scale IP and regional datasets." },
    { name: "Francesca Zannelli", photo: "fz_photo.PNG", bio: "Francesca Zannelli is a PhD candidate at Università Cattolica del Sacro Cuore in Milan, Italy, with research interests in innovation and industrial economics. Drawing on firm-level data and applied microeconometric methods, she investigates how technological change and economic incentives shape firm-level outcomes, with particular interest in the employment effects of technology adoption and green investment, as well as the role of economic and regulatory instruments in shaping technological innovation and environmental performance. Across these areas, her research explores how outcomes vary across firms and industries, with particular attention to differences in technological capabilities." },
  ],
  sessions: [
    /*
    {
      date: "2027-11-10", // YYYY-MM-DD
      reminders: false or true // Automatic broadcasting
      time: "16:00",       // Optional; include your local time zone in location or description
      speaker: "Alex Smith",
      affiliation: "University name", // Optional
      title: "A working paper title",
      description: "One or two sentences about the research question and discussion.",
      location: "Online",  // Optional; or a room and address
      link: ""             // Optional full https:// URL; for online sessions, use the meeting link
    }
    */
    /*
    {
      date: "2026-10-10",
      reminders: false or true, // Automatic broadcasting
      time: "16:00 CET",
      speaker: "Alice Smith, Bob Jones and Carla Rossi",
      affiliation: "Alice Smith (University A); Bob Jones (University B); Carla Rossi (University C)",
      title: "Idea incubation: three early-stage research projects",
      description: "Alice will discuss [idea]. Bob will discuss [idea]. Carla will discuss [idea].",
      location: "Online",
      link: "https://your-actual-meeting-link"
    }
    */
    { date: "2026-11-04", reminders: false, time: "14:30 CET", speaker: "Ester Cipi, Rahmi Can Yamanoğlu, Francesca Zannelli", 
      affiliation: "Ester Cipi (University of Trento and the free University of Bolzano); Rahmi Can Yamanoğlu (Gran Sasso Science Institute); Francesca Zannelli (Catholic University)", 
      title: "Idea incubation: three early-stage research projects", 
      description: "Our first idea incubation session brings together three early-stage projects on climate policy and international scientific collaboration. Ester Cipi explores how the fossil energy mix shapes the effects of carbon pricing on inflation, output and emissions in the euro area, combining empirical analysis with a proposed DSGE framework incorporating fuel substitution and allowance banking. Can Yamanoğlu examines how colonial ties, scientific capacity, accumulated collaboration and university autonomy shape scientific partnerships in the Global South, drawing on OpenAlex articles from 1995–2023. Francesca Zannelli investigates whether green State aid encourages firms regulated by the EU Emissions Trading System to cut emissions, innovate or both, and how these responses depend on their existing technological capabilities.", location: "Online" },
    
    { date: "2026-11-11", reminders: false, time: "14:30 CET", speaker: "TBD", title: "Paper discussion", description: "TBD", location: "Online"},
    
    { date: "2026-12-09", reminders: false, time: "14:30 CET", speaker: "TBD", title: "Paper discussion", description: "TBD", location: "Online"},
    { date: "2027-01-13", reminders: false, time: "14:30 CET", speaker: "TBD", title: "Paper discussion", description: "TBD", location: "Online"},
    { date: "2027-02-10", reminders: false, time: "14:30 CET", speaker: "TBD", title: "Paper discussion", description: "TBD", location: "Online"},
    { date: "2027-03-10", reminders: false, time: "14:30 CET", speaker: "TBD", title: "Paper discussion", description: "TBD", location: "Online"},
    { date: "2027-04-14", reminders: false, time: "14:30 CEST", speaker: "TBD", title: "Paper discussion", description: "TBD", location: "Online"},
    { date: "2027-05-12", reminders: false, time: "14:30 CEST", speaker: "TBD", title: "Paper discussion", description: "TBD", location: "Online"},
    { date: "2027-06-09", reminders: false, time: "14:30 CEST", speaker: "TBD", title: "Paper discussion", description: "TBD", location: "Online"},
    { date: "2027-07-14", reminders: false, time: "14:30 CEST", speaker: "TBD", title: "Paper discussion", description: "TBD", location: "Online"},
    {
      date: "2024-04-11",
      speaker: "Alberto Marzucchi",
      title: "Robots Adoption and Product Innovation"
    },
    {
      date: "2024-05-09",
      speaker: "Stefano Basilico",
      title: "Divergent Paths for Green Transition: Regional Disparities in Technology Diversification"
    },
    {
      date: "2024-06-14",
      speaker: "Davide Lunardon",
      coauthors: ["Alberto Marzucchi (GSSI)", "Fabio Landini (University of Parma)"],
      title: "Green jobs and Meaningful work"
    },
    {
      date: "2024-11-14",
      speaker: "Andrea Ascani",
      title: "Critical Raw Materials and MNE Strategies under Paradigm Shift"
    },
    {
      date: "2024-12-05",
      speaker: "Cecilia Seri",
      coauthors: ["Carlo Pietrobelli", "Andrea Presbitero", "Danilo Spinola"],
      affiliation: "PhD fellow at UNU-MERIT",
      title: "Global FDI Networks Reconfigurations: Strategic Sectors and the Influence of Geopolitical Shifts"
    },
    {
      date: "2025-01-08",
      speaker: "Eduardo Hernández Rodríguez",
      affiliation: "PhD candidate at Utrecht University",
      title: "Centrality in GVCs: Implications for functional upgrading and downgrading dynamics"
    },
    {
      date: "2025-02-12",
      speaker: "Daniela Arlia",
      coauthors: ["Giacomo Lo Conte (University College Dublin)", "Silvia Rocchetta (DCU Business School)"],
      affiliation: "Economist at the European Commission's Joint Research Centre and PhD candidate in Economics at the Aix-Marseille School of Economics",
      title: "Localised innovation and its effects in the labor markets"
    },
    {
      date: "2025-03-06",
      speaker: "Gianluca Biggi",
      affiliation: "Postdoctoral researcher at the Institute of Economics, Scuola Superiore Sant'Anna",
      title: "The uneven geography of remediation technologies: Industrial development and soil contamination in European regions"
    },
    {
      date: "2025-04-08",
      speaker: "Jacopo Tramontano",
      affiliation: "PhD student at Sapienza University of Rome",
      title: "The Impact of Amazon on Italian Local Labor Markets: a Staggered Difference-in-Differences Approach"
    },
    {
      date: "2025-05-12",
      speaker: "Milene Tessarin",
      affiliation: "Postdoctoral researcher at Utrecht University",
      title: "Women in cultural and creative occupations boost innovation in rural areas"
    },
    {
      date: "2025-05-28",
      speaker: "Yibo Qiao",
      affiliation: "Assistant Professor in the Department of Urban and Regional Planning, Nanjing University",
      title: "High-speed Railway and City Industrial Upgrading in China: A Quasi-experimental Study",
      description: "This paper investigates the effect of High-speed Railway (HSR) on city industrial upgrading. Using the Annual Survey of Industrial Firms (1998-2015) and HSR opening information in China, we conduct a difference-in-differences-in-differences (DDD) analysis on 300 prefecture- and higher-level cities and 389 4-digit manufacturing industries. We find that HSR enables cities to enter more complex industries, and this result is robust under parallel trend test, placebo test, instrumental variable estimation, and other specifications. We contribute to Evolutionary Economic Geography by considering HSR as a regional external linkage and by integrating the causal analysis in the study of regional diversification."
    },
    {
      date: "2025-10-23",
      speaker: "Berkeren Büyükeren",
      affiliation: "PhD candidate at the Einaudi Institute for Economics and Finance and LUISS Guido Carli",
      title: "Remaking the State from Below: Local Government Formation in Ukraine",
      description: "Does consolidating local governments while expanding their autonomy improve governance and development? I study Ukraine’s 2015-2020 reform, which allowed small local councils to voluntarily amalgamate into newly created hromadas with greater fiscal and administrative authority. Councils that were wealthier, more Ukrainian-speaking and more similar to their neighbors were more likely to merge. Amalgamation improved procurement performance, strengthened fiscal capacity and increased local economic activity. Survey evidence further shows that residents of rural areas, who were most exposed to the reform, were more likely to identify solely as Ukrainian. The gains were particularly pronounced for smaller hromadas and for peripheral local councils within merged units, as well as in places with greater baseline financial capacity. Together, these findings suggest that consolidating jurisdictions while devolving authority can enhance state effectiveness, stimulate local development and shape civic identity."
    },
    {
      date: "2025-11-13",
      speaker: "Andrea Marini",
      coauthors: ["Fabio Landini", "Ugo Rizzo"],
      affiliation: "PhD candidate at the University of Ferrara",
      title: "The Value of Green Job Attributes: A Discrete Choice Experiment",
      description: "Despite growing evidence that individuals intrinsically care about the environment, particularly when they act as consumers, less is known about their views as workers in the labour market. Moreover, the literature on compensating differentials shows that individuals are willing to trade higher wages for better job attributes, such as flexible schedules and moderate work pace. However, prior research has not investigated preferences for environmental job attributes. This study addresses this gap by estimating individuals’ willingness to pay for previously unexplored green attributes in hypothetical job offers, using a discrete choice experiment on a sample of 2,008 individuals aged 18-30 residing across all Italian regions. We find that workers at the start of their career are, on average, willing to give up between 2% and 8% of their monthly salary to have a green job attribute. Furthermore, willingness to pay varies according to individual characteristics, with women and more prosocial individuals exhibiting stronger preferences for green amenities. These findings have implications for sorting dynamics and managerial policy, suggesting that companies committed to environmental sustainability may attract a higher proportion of prosocial workers, who could arguably contribute more effectively."
    },
    {
      date: "2026-01-15",
      speaker: "Bastian Krieger",
      coauthors: ["Linus Strecke"],
      affiliation: "Researcher at ZEW Leibniz and head of the Junior Research Group Co-Creation in ZEW’s Research Unit Economics of Innovation and Industrial Dynamics",
      title: "Doing Well by Doing Good - Until You Do It Again: Empirical Firm-Level Evidence on Diminishing Returns to Recurrent Social Innovation",
      description: "This paper investigates the relationship between corporate social innovation (CSI) and firm performance measures, using firm-level panel data from Germany. Methodologically, we combine a conventional two-way fixed effects model with a recently developed difference-in-differences estimator that accounts for staggered treatment adoption. We find that the introduction of inclusive CSI practices, such as measures promoting gender equality, refugee inclusion, or support for older employees, is associated with significant gains in turnover and employment. However, by distinguishing treatment timing, we show that these positive effects are concentrated among firms introducing social innovation for the first time. Subsequent expansions or repeated implementations yield limited additional performance benefits, pointing to diminishing returns to recurrent CSI. Our results underscore the strategic and symbolic role of CSI and contribute to a more nuanced understanding of how firms \"do well by doing good.\""
    },
    {
      date: "2026-02-11",
      speaker: "Cece Koczias",
      affiliation: "PhD candidate at Imperial College London",
      title: "The sensemaking abilities of medium-sized firms' managers on climate change and climate risk identification",
      description: "This paper examines how UK medium-sized enterprises (MSEs) identify and interpret climate risks, addressing a critical gap in climate risk research that has largely focused on large corporations or small firms. We conceptualise climate risk identification not as a purely technical task, but as a cognitive and socially situated process through which managers interpret ambiguous climate-related cues and translate them into organisational actions. Drawing on sensemaking theory and the Enactment–Selection–Retention framework, we investigate how managers enact, select, and retain interpretations of climate risk in organisational contexts characterised by their position being squeezed between the demands of large corporate customers and the limited capabilities of smaller suppliers. The study employs a qualitative, inductive design based on 33 semi-structured interviews with owners and senior managers of MSEs, complemented by expert practitioners across the UK manufacturing and service sectors. We uncover a process in which climate risks are enacted through three dominant triggers: supply chain vulnerability, energy infrastructure, and regulatory uncertainty, which constructs a distinctive climate risk domain for MSEs. During selection, managers continuously negotiate between heuristic judgements and formal tools when constructing plausible narratives for action under uncertainty. Retention occurs when these interpretations are anchored in leadership commitment and personal values, enabling the internalisation of climate risk identification within MSEs. Our findings contribute to sensemaking and climate risk literatures, theorising climate risk identification in MSEs as an ongoing sensemaking process, identifying heuristics as the cognitive engine of selection, conceptualising MSEs as a distinctive organisational form that blends heuristic agility with formalisation."
    },
    {
      date: "2026-03-12",
      speaker: "Nicole Lemke",
      affiliation: "Senior Policy Researcher on AI Systems, Markets & Governance at Interface (formerly SNV)",
      coauthors: ["Catherine Schneider"],
      title: "Varieties of AI factories in the European Union",
      description: "The European Union’s AI factories are new institutions on the map of AI innovation in Europe: They are not only supposed to boost European compute capacity but are also to be \"dynamic innovation ecosystems.\" Their recent emergence and central role in the European Commission’s plan to advance European AI makes them important subjects for researchers and policymakers alike. This article draws on the literature on regional innovation systems and innovation intermediaries to provide a conceptualization of AI factories. It builds on this conceptualization to provide a first systematic description of the existing AI factories. The analysis shows that while most of the 13 European AI factories selected before autumn 2025 follow the logic of regional innovation systems, there is extensive variation among them with regard to their geographic location and scope, the regional innovation systems they operate in, the structure of their consortia, and the services they provide. Building on these findings, the article outlines avenues for future research on the topic."
    },
    {
      date: "2026-04-09",
      speaker: "Giacomo Lupi",
      affiliation: "Postdoctoral researcher at University of Ferrara",
      coauthors: ["Ugo Rizzo", "Francesco Rentocchini"],
      title: "One Leaf at a Time? On the Technological Impact of Green Startups",
      description: "This paper investigates whether Green Technology-Based Startups (GTBSs) — firms that patent in environmental domains at an early stage of their life cycle — generate more impactful inventions than other firms and explores the team-level mechanisms underpinning such outcomes. Using patent-level data from 1979 to 2019, covering the majority of US patenting startups, we estimate high-dimensional fixed effects regressions comparing GTBSs with other startups and incumbents. Three main results emerge. First, GTBSs systematically produce patents with higher impact — measured through citations and novelty — than both comparison groups. Second, this premium is primarily driven by their green patents, yet is most pronounced for hybrid GTBSs that combine green and non-green technologies. Moreover, hybrid GTBs, when coupled with moderate inventor-team cognitive diversity, show superior inventive outcomes. However, when cognitive distance is too high, inventive performance advantages tend to disappear. Third, the technological edge of GTBSs diminishes as firms mature, underscoring the time-bound nature of their early-stage innovative advantage. These findings bridge literatures on entrepreneurship, innovation, and environmental studies, and bear implications for policy: in particular, they suggest that fostering startups which integrate green and conventional technologies may maximise both inventive impact and societal returns in the green transition."
    },
    {
      date: "2026-05-07",
      speaker: "Francesco Lelli",
      affiliation: "Research fellow at INGENIO (Valencia) and the University of Trento",
      coauthors: ["Alice Bertoletti"],
      title: "“Girls Just Want to Do Math”: Maternal Role Models and Local Stereotypes in the Mathematics Gender Gap of Italian Regions",
      description: "This paper examines the role of family-based role models and local social context in shaping gender disparities in mathematics achievement among Italian students. Drawing on the literature on the determinants of gender gaps in mathematics, the study addresses the limited empirical integration of family and context-based factors. By using longitudinal administrative data from INVALSI, covering primary and lower secondary education, the analysis adopts a dynamic panel framework with instrumental variables to study how gender gaps evolve across different regions and stages of schooling. The main contribution of the paper is represented by the integration of maternal employment and contextual indicators of gender stereotypes, proxied by local levels of female unemployment rates and exposure to gender-based violence, within a unified empirical framework. The results show that having a working mother mitigates the gender gap in mathematics during lower secondary school, consistent with a role-model mechanism. In contrast, exposure to gender-based violence is associated with poorer outcomes for girls, particularly in Grade 5. Importantly, maternal employment partially mitigates the negative association between adverse gendered environments and girls’ achievement, highlighting the heterogeneity of the phenomenon and the interaction between household role models and local gender norms in shaping educational gender gaps."
    }
  ]
};
