/* Edit or delete any session below. Add new ones as { date: "YYYY-MM-DD", speaker: "Name", title: "Paper title" }. Entries with TBD details expire after their date; completed sessions move to the archive. */
window.PDS_DATA = {
  email: "info@paperdevelopmentseries.org", // Public contact address and contact form destination
  proposalUrl: "", // Optional Google Form or other submission link; use a full https:// URL
  // Replace each placeholder with a name, a short bio, and an optional photo path.
  // Upload portraits to images/organisers/ in this repository; for example photo: "images/organisers/alex-smith.jpg".
  // Add or delete { name, photo, bio } rows to change the number of organisers.
  organisers: [
    { name: "Organiser 01", photo: "", bio: "" },
    { name: "Organiser 02", photo: "", bio: "" },
    { name: "Organiser 03", photo: "", bio: "" },
    { name: "Organiser 04", photo: "", bio: "" },
    { name: "Organiser 05", photo: "", bio: "" },
    { name: "Organiser 06", photo: "", bio: "" },
    { name: "Organiser 07", photo: "", bio: "" },
    { name: "Organiser 08", photo: "", bio: "" },
    { name: "Organiser 09", photo: "", bio: "" },
  ],
  sessions: [
    /*
    {
      date: "2027-11-10", // YYYY-MM-DD
      time: "16:00",       // Optional; include your local time zone in location or description
      speaker: "Alex Smith",
      affiliation: "University name", // Optional
      title: "A working paper title",
      description: "One or two sentences about the research question and discussion.",
      location: "Online",  // Optional; or a room and address
      link: ""             // Optional full https:// URL; for online sessions, use the meeting link
    }
    */
    {
      date: "2026-09-26",
      time: "14:30 CET",
      speaker: "R. Maria del Rio-Chanona",
      coauthors: ["Linus Strecke", "Ole Teutloff"],
      affiliation: "Assistant Professor, University College London",
      title: "AI and jobs",
      description: "Generative AI is altering work processes, task composition, and organizational design, yet its effects on employment and the macroeconomy remain unresolved. In this review, we synthesize theory and empirical evidence at three levels. First, we trace the evolution from aggregate production frameworks to task- and expertise-based models. Second, we quantitatively review and compare (ex-ante) AI exposure measures of occupations from multiple studies and find convergence towards high-wage jobs. Third, we assemble ex-post evidence of AI's impact on employment from randomized controlled trials (RCTs), field experiments, and digital trace data (e.g., online labor platforms, software repositories), complemented by partial coverage of surveys. Across the reviewed studies, productivity gains are sizable but context-dependent: on the order of 20 to 60 percent in controlled RCTs, and 15 to 30 percent in field experiments. Novice workers tend to benefit more from LLMs in simple tasks. Across complex tasks, evidence is mixed on whether low or high-skilled workers benefit more. Digital trace data show substitution between humans and machines in writing and translation alongside rising demand for AI, with mild evidence of declining demand for novice workers. A more substantial decrease in demand for novice jobs across AI complementary work emerges from recent studies using surveys, platform payment records, or administrative data. Research gaps include the focus on simple tasks in experiments, the limited diversity of LLMs studied, and technology-centric AI exposure measures that overlook adoption dynamics and whether exposure translates into substitution, productivity gains, erode or increase expertise.",
      location: "Online",
      link: "https://www.deepl.com/it/translator"
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
    },
    { date: "2026-10-15", speaker: "TBD", title: "TBD" },
    { date: "2026-11-11", speaker: "TBD", title: "TBD" },
    { date: "2026-12-09", speaker: "TBD", title: "TBD" },
    { date: "2027-01-13", speaker: "TBD", title: "TBD" },
    { date: "2027-02-10", speaker: "TBD", title: "TBD" },
    { date: "2027-03-10", speaker: "TBD", title: "TBD" },
    { date: "2027-04-14", speaker: "TBD", title: "TBD" },
    { date: "2027-05-12", speaker: "TBD", title: "TBD" },
    { date: "2027-06-09", speaker: "TBD", title: "TBD" },
    { date: "2027-07-14", speaker: "TBD", title: "TBD" }
  ]
};
