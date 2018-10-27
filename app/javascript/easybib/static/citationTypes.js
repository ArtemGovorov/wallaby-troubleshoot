const citationTypes = [
  {
    name: 'Website',
    value: 'website',
    manual: false,
    apiAlias: 'website',
    title: 'a Website',
  },
  {
    name: 'Book',
    value: 'book',
    manual: false,
    apiAlias: 'book',
    title: 'a Book',
  },
  {
    name: 'Journal',
    value: 'journal',
    manual: false,
    apiAlias: 'journal',
    title: 'a Journal',
  },
  {
    name: 'Newspaper',
    value: 'newspaper',
    manual: false,
    apiAlias: 'newspaper',
    title: 'a Newspaper',
  },
  {
    name: 'Film/Online Video',
    value: 'film',
    manual: false,
    apiAlias: 'film',
    title: 'a Film',
  },
  {
    name: 'Online Database',
    value: 'online-database',
    manual: true,
    apiAlias: 'database',
    title: 'an Online Database',
  },
  {
    name: 'Advertisement',
    value: 'advertisement',
    manual: true,
    title: 'an Advertisement',
    apiAlias: 'advertisement',
  },
  {
    name: 'Bible',
    value: 'bible',
    manual: false,
    title: 'a Bible',
    apiAlias: 'bible',
  },
  {
    name: 'Blog',
    value: 'blog',
    manual: true,
    title: 'a Blog',
    apiAlias: 'blog',
  },
  {
    name: 'Brochure',
    value: 'brochure',
    manual: true,
    title: 'a Brochure',
    apiAlias: 'brochure',
  },
  {
    name: 'Cartoon',
    value: 'cartoon',
    manual: true,
    title: 'a Cartoon',
    apiAlias: 'cartoon',
  },
  {
    name: 'Chapter',
    value: 'chapter',
    manual: false,
    title: 'a Chapter',
    apiAlias: 'chapter',
  },
  {
    name: 'Conference',
    value: 'conference',
    manual: false,
    title: 'a Conference',
    apiAlias: 'conference',
  },
  {
    name: 'Congress',
    value: 'congress',
    manual: false,
    title: 'a Congressional Publication',
    apiAlias: 'congress',
  },
  {
    name: 'Court Case',
    value: 'court-case',
    manual: true,
    title: 'a Court Case',
    apiAlias: 'courtcase',
  },
  {
    name: 'Database',
    value: 'database',
    manual: true,
    title: 'a Database',
    apiAlias: 'database',
  },
  {
    name: 'Dictionary',
    value: 'dictionary',
    manual: false,
    title: 'a Dictionary',
    apiAlias: 'dictionary',
  },
  {
    name: 'Digital File',
    value: 'digital',
    manual: true,
    title: 'a Digital File',
    apiAlias: 'digital',
  },
  {
    name: 'Digital Image',
    value: 'image',
    manual: true,
    title: 'a Digital Image',
    apiAlias: 'image',
  },
  {
    name: 'Dissertation',
    value: 'dissertation',
    manual: false,
    title: 'a Dissertation',
    apiAlias: 'dissertation',
  },
  {
    name: 'Dissertation Abstract',
    value: 'dissertation-abstract',
    manual: false,
    title: 'a Dissertation Abstract',
    apiAlias: 'dissertationabstract',
  },
  {
    name: 'Editorial',
    value: 'editorial',
    manual: true,
    title: 'an Editorial',
    apiAlias: 'editorial',
  },
  {
    name: 'Email',
    value: 'email',
    manual: true,
    title: 'an Email',
    apiAlias: 'email',
  },
  {
    name: 'Encyclopedia',
    value: 'encyclopedia',
    manual: false,
    title: 'an Encyclopedia',
    apiAlias: 'encyclopedia',
  },
  {
    name: 'Executive Order',
    value: 'executive-order',
    manual: true,
    title: 'an Executive Order',
    apiAlias: 'executiveorder',
  },
  {
    name: 'Federal Bill',
    value: 'federal-bill',
    apiAlias: 'fedbill',
    manual: false,
    title: 'a Federal Bill',
  },
  {
    name: 'Federal Report',
    value: 'federal-report',
    apiAlias: 'fedreport',
    manual: true,
    title: 'a Federal Report',
  },
  {
    name: 'Federal Rule',
    value: 'federal-rule',
    apiAlias: 'fedrule',
    manual: true,
    title: 'a Federal Rule',
  },
  {
    name: 'Federal Statute',
    value: 'federal-statute',
    apiAlias: 'statute',
    manual: true,
    title: 'a Federal Statute',
  },
  {
    name: 'Federal Testimony',
    value: 'federal-testimony',
    apiAlias: 'testimony',
    manual: true,
    title: 'Federal Testimony',
  },
  {
    name: 'Government Publication',
    value: 'govt',
    manual: false,
    title: 'a Government Publication',
    apiAlias: 'govt',
  },
  {
    name: 'Interview',
    value: 'interview',
    manual: true,
    title: 'an Interview',
    apiAlias: 'interview',
  },
  {
    name: 'Introduction',
    value: 'introduction',
    manual: false,
    title: 'an Introduction',
    apiAlias: 'introduction',
  },
  {
    name: 'Lecture',
    value: 'lecture',
    manual: true,
    title: 'a Lecture',
    apiAlias: 'lecture',
  },
  {
    name: 'Letter',
    value: 'letter',
    manual: true,
    title: 'a Letter',
    apiAlias: 'letter',
  },
  {
    name: 'Magazine',
    value: 'magazine',
    manual: false,
    title: 'a Magazine',
    apiAlias: 'magazine',
  },
  {
    name: 'Mailing List',
    value: 'mailing-list',
    manual: true,
    title: 'a Mailing List',
    apiAlias: 'mailinglist',
  },
  {
    name: 'Manuscript',
    value: 'manuscript',
    manual: true,
    title: 'a Manuscript',
    apiAlias: 'manuscript',
  },
  {
    name: 'Map',
    value: 'map',
    manual: false,
    title: 'a Map',
    apiAlias: 'map',
  },
  {
    name: 'Microform',
    value: 'microform',
    manual: true,
    title: 'a Microform',
    apiAlias: 'microform',
  },
  {
    name: 'Miscellaneous',
    value: 'miscellaneous',
    manual: true,
    title: 'a Miscellaneous Source',
    apiAlias: 'miscellaneous',
  },
  {
    name: 'Multivolume',
    value: 'multivolume',
    manual: false,
    title: 'a Multivolume Source',
    apiAlias: 'multivolume',
  },
  {
    name: 'Music',
    value: 'music',
    manual: true,
    title: 'Music',
    apiAlias: 'music',
  },
  {
    name: 'Musical Recording',
    value: 'musical-recording',
    manual: false,
    title: 'a Musical Recording',
    apiAlias: 'musicalrecording',
  },
  {
    name: 'Newsgroup',
    value: 'newsgroup',
    manual: true,
    title: 'a Newsgroup',
    apiAlias: 'newsgroup',
  },
  {
    name: 'Newsletter',
    value: 'newsletter',
    manual: true,
    title: 'a Newsletter',
    apiAlias: 'newsletter',
  },
  {
    name: 'Painting',
    value: 'painting',
    manual: true,
    title: 'a Painting',
    apiAlias: 'painting',
  },
  {
    name: 'Pamphlet',
    value: 'pamphlet',
    manual: true,
    title: 'a Pamphlet',
    apiAlias: 'pamphlet',
  },
  {
    name: 'Patent',
    value: 'patent',
    manual: true,
    title: 'a Patent',
    apiAlias: 'patent',
  },
  {
    name: 'Performance',
    value: 'performance',
    manual: true,
    title: 'a Performance',
    apiAlias: 'performance',
  },
  {
    name: 'Photo',
    value: 'photo',
    manual: true,
    title: 'a Photo',
    apiAlias: 'photo',
  },
  {
    name: 'Press Release',
    value: 'press',
    manual: true,
    title: 'a Press Release',
    apiAlias: 'press',
  },
  {
    name: 'Raw Data',
    value: 'raw-data',
    manual: true,
    title: 'Raw Data',
    apiAlias: 'rawdata',
  },
  {
    name: 'Report',
    value: 'report',
    manual: true,
    title: 'a Report',
    apiAlias: 'report',
  },
  {
    name: 'Reprinted Work',
    value: 'collection',
    manual: true,
    title: 'Reprint',
    apiAlias: 'collection',
  },
  {
    name: 'Review',
    value: 'review',
    manual: true,
    title: 'a Review',
    apiAlias: 'review',
  },
  {
    name: 'Scholarly Project',
    value: 'scholarly-project',
    manual: true,
    title: 'a Scholarly Project',
    apiAlias: 'scholarlyproject',
  },
  {
    name: 'Software',
    value: 'software',
    manual: false,
    title: 'Software',
    apiAlias: 'software',
  },
  {
    name: 'TV/Radio',
    value: 'tv',
    manual: true,
    apiAlias: 'tv',
    title: 'a TV/Radio Show',
  },
  {
    name: 'Thesis',
    value: 'thesis',
    manual: false,
    title: 'a Thesis',
    apiAlias: 'thesis',
  },
  {
    name: 'Write/paste citation',
    value: 'custom',
    manual: true,
    title: 'a Custom Citation',
    apiAlias: 'custom',
  },
  {
    name: 'Upload/database import',
    value: 'upload',
    manual: true,
    pro: true,
    title: 'upload',
    apiAlias: 'upload',
  },
]

export default citationTypes