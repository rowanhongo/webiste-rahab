import { Business, BlogPost, Program } from '../types';

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Grace Catering Services',
    logo: '🍽️',
    category: 'Food & Hospitality',
    description: 'Christian-owned catering service specializing in events and corporate functions.',
    isNew: true,
  },
  {
    id: '2',
    name: 'Faithful Finance Consulting',
    logo: '💰',
    category: 'Financial Services',
    description: 'Biblical financial planning and consulting services for individuals and businesses.',
  },
  {
    id: '3',
    name: 'Kingdom Kids Academy',
    logo: '🎓',
    category: 'Education',
    description: 'Christian early childhood education center focused on holistic development.',
  },
  {
    id: '4',
    name: 'Blessed Boutique',
    logo: '👗',
    category: 'Fashion & Retail',
    description: 'Modest fashion boutique promoting biblical values through clothing.',
    isNew: true,
  },
  {
    id: '5',
    name: 'Cornerstone Construction',
    logo: '🏗️',
    category: 'Construction',
    description: 'Christian construction company building homes and commercial spaces.',
  },
  {
    id: '6',
    name: 'Harvest Digital Marketing',
    logo: '📱',
    category: 'Digital Services',
    description: 'Faith-based digital marketing agency helping Christian businesses grow online.',
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Your Business on Biblical Principles',
    excerpt: 'Discover how to integrate your faith into every aspect of your business operations.',
    content: 'Full blog post content here...',
    author: 'Sarah Johnson',
    date: '2025-01-15',
    category: 'Faith & Business',
    imageUrl: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    title: 'The Power of Stewardship in Entrepreneurship',
    excerpt: 'Learn how viewing your business as a stewardship opportunity can transform your approach.',
    content: 'Full blog post content here...',
    author: 'David Williams',
    date: '2025-01-10',
    category: 'Stewardship',
    imageUrl: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    title: 'Finding Your Purpose in Business',
    excerpt: 'Discover your God-given calling and how to align your business with His purpose.',
    content: 'Full blog post content here...',
    author: 'Grace Thompson',
    date: '2025-01-05',
    category: 'Purpose',
    imageUrl: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const programs: Program[] = [
  {
    id: 'whats-in-your-hand',
    name: "What's in Your Hand",
    description: 'An 8-week business development studio for kingdom-minded individuals who want to build ventures rooted in God\'s vision. Whether transitioning from a 9–5 or launching a business alongside your job, this program helps participants create, refine, and launch a profitable venture, guided by biblical values, spiritual clarity, and strategic structure.',
    primaryColor: 'royal-blue',
    accentColors: ['mustard-yellow', 'ivory'],
    features: [
      '8-week intensive program',
      'Biblical business principles',
      'Spiritual clarity sessions',
      'Strategic structure development',
      'Peer collaboration',
      'Expert mentorship',
    ],
  },
  {
    id: 'net-in-the-deep',
    name: 'Net in the Deep',
    description: 'A track for those ready to go deeper. It focuses on scaling, structure, spiritual discipline, and obedience-driven action. Ideal for those with businesses in development who want to formalize and scale in alignment with their faith.',
    primaryColor: 'mustard-yellow',
    accentColors: ['ivory', 'royal-blue'],
    features: [
      'Business scaling strategies',
      'Spiritual discipline training',
      'Obedience-driven action plans',
      'Formalization processes',
      'Faith-aligned scaling',
      'Advanced mentorship',
    ],
  },
  {
    id: 'the-boat',
    name: 'The Boat',
    description: 'A content hub for teaching, storytelling, and prophetic business conversations via YouTube. Join us for inspiring content that bridges faith and entrepreneurship.',
    primaryColor: 'royal-blue',
    accentColors: ['mustard-yellow', 'ivory'],
    features: [
      'Weekly YouTube content',
      'Prophetic business insights',
      'Success stories',
      'Teaching sessions',
      'Community discussions',
      'Live Q&A sessions',
    ],
  },
];