import React, { useState, useEffect } from 'react';
import { 
  Camera, Play, Users, Search, Bell, Menu, X, Star, DollarSign, 
  Briefcase, MapPin, Film, Clapperboard, MonitorPlay, Heart, 
  Share2, ArrowRight, CheckCircle, Clock, ChevronRight, Filter, User
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_USERS = [
  {
    id: 1,
    name: 'Elena Rodriguez',
    role: 'Director',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    banner: 'https://images.unsplash.com/photo-1485002251347-19eb79f42b23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    bio: 'Award-winning indie director focused on sci-fi and psychological thrillers.',
    location: 'Los Angeles, CA',
    skills: ['Directing', 'Screenwriting', 'Cinematography'],
    portfolio: [
      { id: 1, type: 'video', url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' },
      { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80' },
    ]
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Cinematographer',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    banner: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    bio: 'Specializing in anamorphic lenses and low-light stylized shoots.',
    location: 'New York, NY',
    skills: ['Lighting', 'Camera Operation', 'Color Grading'],
    portfolio: []
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    role: 'Actor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    banner: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    bio: 'Classically trained actor with 10 years of stage and screen experience.',
    location: 'London, UK',
    skills: ['Method Acting', 'Voiceover', 'Stunts'],
    portfolio: []
  }
];

const MOCK_CAMPAIGNS = [
  {
    id: 101,
    creator_id: 1,
    title: 'Neon Shadows: A Cyberpunk Short',
    synopsis: 'In a dystopian future, a rogue AI detective must solve the murder of her human creator before she is decommissioned.',
    goal_amount: 50000,
    raised_amount: 32450,
    poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Sci-Fi',
    supporters: 142,
    days_left: 12
  },
  {
    id: 102,
    creator_id: 2,
    title: 'The Last Symphony',
    synopsis: 'A deaf composer tries to write his final masterpiece while losing his remaining connection to the world.',
    goal_amount: 15000,
    raised_amount: 16200,
    poster_url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Drama',
    supporters: 89,
    days_left: 0
  },
  {
    id: 103,
    creator_id: 1,
    title: 'Echoes of the Valley',
    synopsis: 'A documentary exploring the forgotten folklore of remote mountain villages.',
    goal_amount: 25000,
    raised_amount: 5000,
    poster_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Documentary',
    supporters: 21,
    days_left: 45
  }
];

const MOCK_CASTING = [
  {
    id: 201,
    creator_id: 1,
    title: 'Lead Detective - Neon Shadows',
    role_name: 'Lead Actor',
    location: 'Los Angeles, CA',
    dates: 'Oct 15 - Nov 2',
    requirements: 'Female, 25-35. Athletic build. Experience with wire-work preferred.',
    status: 'Open'
  },
  {
    id: 202,
    creator_id: 2,
    title: 'VFX Supervisor - The Last Symphony',
    role_name: 'VFX Artist',
    location: 'Remote',
    dates: 'Post-production (Jan - Mar)',
    requirements: 'Expert in Nuke and Maya. Previous experience with subtle environmental effects.',
    status: 'Open'
  }
];

// --- COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
    outline: "border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-600/10",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-800"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const ProgressBar = ({ current, target }) => {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  return (
    <div className="w-full bg-slate-800 rounded-full h-2.5 mb-2 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// --- MAIN APPLICATION ---

export default function App() {
  const [currentRoute, setCurrentRoute] = useState({ path: 'home', params: {} });
  const [currentUser, setCurrentUser] = useState(null); // null = logged out
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
  const [castingCalls, setCastingCalls] = useState(MOCK_CASTING);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  // New states for interactive features
  const [showPostCastingModal, setShowPostCastingModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyTarget, setApplyTarget] = useState(null);
  const [messages, setMessages] = useState([]);
  const [applications, setApplications] = useState([]);

  const navigate = (path, params = {}) => {
    window.scrollTo(0, 0);
    setCurrentRoute({ path, params });
  };

  const getUser = (id) => MOCK_USERS.find(u => u.id === id);

  const handleDonate = (amount) => {
    if (!currentUser) {
      setShowPaymentModal(false);
      setShowAuthModal(true);
      return;
    }
    
    // Simulate successful Razorpay payment
    setTimeout(() => {
      setCampaigns(prev => prev.map(c => 
        c.id === paymentData.campaign.id 
          ? { ...c, raised_amount: c.raised_amount + amount, supporters: c.supporters + 1 } 
          : c
      ));
      setShowPaymentModal(false);
      alert(`Success! Payment of $${amount} processed via Razorpay Mock.`);
    }, 1500);
  };

  // --- VIEWS ---

  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
            <Clapperboard className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              CineConnect
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button onClick={() => navigate('discover')} className="text-slate-300 hover:text-white transition-colors">Discover</button>
            <button onClick={() => navigate('discover', { tab: 'casting' })} className="text-slate-300 hover:text-white transition-colors">Casting Calls</button>
            {currentUser && <button onClick={() => navigate('dashboard')} className="text-slate-300 hover:text-white transition-colors">Dashboard</button>}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search campaigns, talent..." 
                className="bg-slate-900 border border-slate-800 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-indigo-500 text-slate-200"
              />
            </div>
            
            {currentUser ? (
              <div className="flex items-center gap-4">
                <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
                <div 
                  className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 cursor-pointer"
                  onClick={() => navigate('profile', { id: currentUser.id })}
                >
                  <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            ) : (
              <Button variant="primary" onClick={() => setShowAuthModal(true)}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  const HomeView = () => (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-8">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">The #1 Platform for Indie Filmmakers</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Fund Your Film. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Find Your Crew.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            CineConnect is the premier ecosystem where creators raise funds, discover top-tier talent, and bring visionary cinematic projects to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="px-8 py-4 text-lg" onClick={() => navigate('discover')}>
              Start Fundraising
            </Button>
            <Button variant="secondary" className="px-8 py-4 text-lg" onClick={() => navigate('discover', { tab: 'talent' })}>
              Discover Talent
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Campaigns</h2>
            <p className="text-slate-400">Projects catching the industry's eye right now.</p>
          </div>
          <Button variant="ghost" onClick={() => navigate('discover')}>View All <ArrowRight className="w-4 h-4" /></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all cursor-pointer group" onClick={() => navigate('campaign', { id: campaign.id })}>
              <div className="relative h-60 overflow-hidden">
                <img src={campaign.poster_url} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
                  {campaign.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{campaign.title}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">{campaign.synopsis}</p>
                
                <ProgressBar current={campaign.raised_amount} target={campaign.goal_amount} />
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-indigo-400 font-bold">${campaign.raised_amount.toLocaleString()}</span>
                  <span className="text-slate-500">of ${campaign.goal_amount.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <img src={getUser(campaign.creator_id)?.avatar} alt="Creator" className="w-8 h-8 rounded-full" />
                    <span className="text-sm text-slate-300">{getUser(campaign.creator_id)?.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-sm">
                    <Clock className="w-4 h-4" /> {campaign.days_left > 0 ? `${campaign.days_left} days` : 'Ended'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Talent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Trending Creators</h2>
            <p className="text-slate-400">Discover actors, directors, and crew for your next project.</p>
          </div>
          <Button variant="ghost" onClick={() => navigate('discover', { tab: 'talent' })}>Directory <ArrowRight className="w-4 h-4" /></Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_USERS.map(user => (
            <div key={user.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-indigo-500/50 transition-colors cursor-pointer" onClick={() => navigate('profile', { id: user.id })}>
              <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-slate-800" />
              <h3 className="text-lg font-bold text-white">{user.name}</h3>
              <p className="text-indigo-400 text-sm mb-4">{user.role}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {user.skills.slice(0, 2).map(skill => (
                  <span key={skill} className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const DiscoverView = () => {
    const [activeTab, setActiveTab] = useState(currentRoute.params?.tab || 'campaigns');

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-white">Discover</h1>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 w-full md:w-auto">
            {['campaigns', 'talent', 'casting'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
                  activeTab === tab ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Filter className="w-4 h-4"/> Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Category</label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500">
                    <option>All Categories</option>
                    <option>Sci-Fi</option>
                    <option>Drama</option>
                    <option>Documentary</option>
                  </select>
                </div>
                {activeTab !== 'campaigns' && (
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Role</label>
                    <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500">
                      <option>All Roles</option>
                      <option>Director</option>
                      <option>Actor</option>
                      <option>Cinematographer</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Location</label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500">
                    <option>Anywhere</option>
                    <option>Los Angeles</option>
                    <option>New York</option>
                    <option>London</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1">
            {activeTab === 'campaigns' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all cursor-pointer group" onClick={() => navigate('campaign', { id: campaign.id })}>
                    <div className="h-48 overflow-hidden relative">
                      <img src={campaign.poster_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white mb-1">{campaign.title}</h3>
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2">{campaign.synopsis}</p>
                      <ProgressBar current={campaign.raised_amount} target={campaign.goal_amount} />
                      <div className="flex justify-between text-xs mt-2 text-slate-400">
                        <span><strong className="text-indigo-400">${campaign.raised_amount.toLocaleString()}</strong> raised</span>
                        <span>{Math.round((campaign.raised_amount/campaign.goal_amount)*100)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'talent' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {MOCK_USERS.map(user => (
                   <div key={user.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:bg-slate-800/50 transition-colors" onClick={() => navigate('profile', { id: user.id })}>
                     <img src={user.avatar} className="w-16 h-16 rounded-full object-cover" alt="" />
                     <div>
                       <h3 className="font-bold text-white">{user.name}</h3>
                       <p className="text-sm text-indigo-400 mb-1">{user.role}</p>
                       <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3"/> {user.location}</p>
                     </div>
                   </div>
                ))}
              </div>
            )}

            {activeTab === 'casting' && (
              <div className="space-y-4">
                <div className="flex justify-end mb-4">
                  {currentUser ? (
                    <Button onClick={() => setShowPostCastingModal(true)}>Post a Casting Call</Button>
                  ) : (
                    <Button variant="outline" onClick={() => setShowAuthModal(true)}>Sign in to Post</Button>
                  )}
                </div>
                {castingCalls.map(call => (
                  <div key={call.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs px-2 py-1 rounded-md">{call.role_name}</span>
                        <span className="text-slate-500 text-sm flex items-center gap-1"><MapPin className="w-4 h-4"/>{call.location}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{call.title}</h3>
                      <p className="text-slate-400 text-sm max-w-2xl">{call.requirements}</p>
                    </div>
                    <Button 
                      variant={applications.some(a => a.callId === call.id) ? "outline" : "secondary"}
                      onClick={() => {
                        if (!currentUser) return setShowAuthModal(true);
                        if (applications.some(a => a.callId === call.id)) return alert('Already applied!');
                        setApplyTarget(call);
                        setShowApplyModal(true);
                      }}
                    >
                      {applications.some(a => a.callId === call.id) ? "Applied ✓" : "Apply Now"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CampaignDetailView = () => {
    const campaign = campaigns.find(c => c.id === currentRoute.params?.id);
    if (!campaign) return <div>Campaign not found</div>;
    const creator = getUser(campaign.creator_id);

    return (
      <div className="pb-24">
        <div className="w-full h-[50vh] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10"></div>
          <img src={campaign.poster_url} className="w-full h-full object-cover" alt="Banner" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-sm font-medium border border-indigo-500/30 mb-4 inline-block">{campaign.category}</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{campaign.title}</h1>
                <p className="text-xl text-slate-300">{campaign.synopsis}</p>
              </div>

              <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl cursor-pointer hover:bg-slate-800/80 transition-colors" onClick={() => navigate('profile', { id: creator.id })}>
                <img src={creator.avatar} className="w-14 h-14 rounded-full" alt="Creator" />
                <div>
                  <p className="text-sm text-slate-400">Created by</p>
                  <p className="text-lg font-bold text-white">{creator.name}</p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl font-bold text-white border-b border-slate-800 pb-2 mb-4">About the Project</h3>
                <p className="text-slate-300 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>

            {/* Sidebar Funding Box */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24 shadow-2xl">
                <ProgressBar current={campaign.raised_amount} target={campaign.goal_amount} />
                
                <div className="mt-6 space-y-6">
                  <div>
                    <h2 className="text-4xl font-bold text-indigo-400">${campaign.raised_amount.toLocaleString()}</h2>
                    <p className="text-slate-400">raised of ${campaign.goal_amount.toLocaleString()} goal</p>
                  </div>
                  
                  <div className="flex justify-between border-t border-slate-800 pt-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{campaign.supporters}</h3>
                      <p className="text-slate-400 text-sm">Supporters</p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-white">{campaign.days_left}</h3>
                      <p className="text-slate-400 text-sm">Days left</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-4 text-lg" 
                    onClick={() => {
                      setPaymentData({ campaign });
                      setShowPaymentModal(true);
                    }}
                  >
                    Back this Project
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button variant="secondary" className="flex-1"><Heart className="w-4 h-4" /> Save</Button>
                    <Button variant="secondary" className="flex-1"><Share2 className="w-4 h-4" /> Share</Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  const ProfileView = () => {
    const profileUser = getUser(currentRoute.params?.id);
    if (!profileUser) return <div>User not found</div>;

    return (
      <div className="pb-24">
        {/* Banner */}
        <div className="h-64 md:h-80 w-full relative">
          <img src={profileUser.banner} className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-40 h-40 rounded-full border-4 border-slate-950 overflow-hidden shrink-0 shadow-2xl">
              <img src={profileUser.avatar} className="w-full h-full object-cover" alt={profileUser.name} />
            </div>
            
            <div className="flex-1 pt-4 md:pt-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{profileUser.name}</h1>
                <p className="text-xl text-indigo-400 mb-2">{profileUser.role}</p>
                <div className="flex items-center gap-4 text-slate-400 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {profileUser.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> Available for work</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="secondary"
                  onClick={() => {
                    if (!currentUser) return setShowAuthModal(true);
                    if (currentUser.id === profileUser.id) return alert("You can't message yourself!");
                    setMessageRecipient(profileUser);
                    setShowMessageModal(true);
                  }}
                >
                  Message
                </Button>
                <Button variant="primary">Hire Me</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">About</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{profileUser.bio}</p>
                <h4 className="font-semibold text-white mb-3 text-sm">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profileUser.skills.map(skill => (
                    <span key={skill} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs border border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-6">Portfolio</h3>
              {profileUser.portfolio.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profileUser.portfolio.map(item => (
                    <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-800 cursor-pointer">
                      <img src={item.url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Portfolio" />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-indigo-600/90 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl border-dashed">
                  <Camera className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No portfolio items uploaded yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardView = () => {
    if (!currentUser) return <div>Please log in</div>;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Raised</p>
                <h3 className="text-3xl font-bold text-white">$45,250</h3>
              </div>
              <div className="p-3 bg-indigo-500/10 rounded-lg"><DollarSign className="w-6 h-6 text-indigo-400" /></div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-1">Active Campaigns</p>
                <h3 className="text-3xl font-bold text-white">2</h3>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg"><Film className="w-6 h-6 text-purple-400" /></div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-1">Applications</p>
                <h3 className="text-3xl font-bold text-white">{applications.length || 14}</h3>
              </div>
              <div className="p-3 bg-pink-500/10 rounded-lg"><Users className="w-6 h-6 text-pink-400" /></div>
            </div>
          </div>
        </div>

        {/* MESSAGES & APPLICATIONS ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Recent Messages Sent</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
              {messages.length === 0 ? (
                <p className="text-slate-500 text-sm p-4 text-center">No messages sent yet.</p>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="p-4 border border-slate-800 rounded-xl bg-slate-950/50">
                    <p className="text-xs text-indigo-400 mb-1">To: {msg.toName}</p>
                    <p className="text-slate-300 text-sm">{msg.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Applied Roles</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
              {applications.length === 0 ? (
                <p className="text-slate-500 text-sm p-4 text-center">No applications yet.</p>
              ) : (
                applications.map(app => (
                  <div key={app.id} className="p-4 border border-slate-800 rounded-xl bg-slate-950/50">
                    <h4 className="font-bold text-white text-sm">{app.callTitle}</h4>
                    <p className="text-xs text-slate-500 mb-2">Role: {app.roleName}</p>
                    <p className="text-slate-400 text-sm italic">"{app.message}"</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-6">Your Campaigns</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="p-4 text-sm font-medium text-slate-400">Project</th>
                <th className="p-4 text-sm font-medium text-slate-400">Status</th>
                <th className="p-4 text-sm font-medium text-slate-400">Raised</th>
                <th className="p-4 text-sm font-medium text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.filter(c => c.creator_id === currentUser.id).map(c => (
                <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={c.poster_url} className="w-12 h-12 rounded object-cover" alt="" />
                      <span className="font-medium text-white">{c.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs border border-green-500/20">Active</span>
                  </td>
                  <td className="p-4 text-slate-300">
                    ${c.raised_amount.toLocaleString()} <span className="text-slate-500 text-sm">/ ${c.goal_amount.toLocaleString()}</span>
                  </td>
                  <td className="p-4">
                    <Button variant="outline" className="py-1.5 px-3 text-sm">Manage</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- MODALS ---

  const AuthModal = () => {
    if (!showAuthModal) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
          <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center mb-8">
            <Clapperboard className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to CineConnect</h2>
            <p className="text-slate-400 text-sm">Sign in to fund projects and discover talent.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input type="email" value="demo@cineconnect.com" readOnly className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input type="password" value="password123" readOnly className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <Button 
              className="w-full mt-6" 
              onClick={() => {
                setCurrentUser(MOCK_USERS[0]); // Auto login as Elena
                setShowAuthModal(false);
              }}
            >
              Sign In (Demo)
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const RazorpayMockModal = () => {
    if (!showPaymentModal || !paymentData) return null;
    const [amount, setAmount] = useState(100);
    const platformFee = amount * 0.01;
    const total = amount + platformFee;

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
          
          {/* Mock Razorpay Header */}
          <div className="bg-slate-950 border-b border-slate-800 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-blue-500 font-bold tracking-tight">
              <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
              Razorpay <span className="text-slate-500 font-normal text-xs ml-2">Mock Checkout</span>
            </div>
            <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
          </div>

          <div className="p-6">
            <h3 className="text-white font-medium mb-1">Backing "{paymentData.campaign.title}"</h3>
            <p className="text-sm text-slate-400 mb-6">Enter your donation amount.</p>

            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400">$</span>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border-2 border-indigo-500/50 rounded-xl py-4 pl-10 pr-4 text-3xl font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="bg-slate-950 rounded-xl p-4 space-y-3 mb-6 border border-slate-800">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Donation Amount</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Platform Fee (1%)</span>
                <span>${platformFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-800 my-2"></div>
              <div className="flex justify-between font-bold text-white">
                <span>Total Payment</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-3 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800/50">
                <input type="radio" name="payment" defaultChecked className="text-indigo-500 focus:ring-indigo-500 bg-slate-900 border-slate-700" />
                <span className="text-white font-medium">Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-800 rounded-xl cursor-pointer hover:bg-slate-800/50">
                <input type="radio" name="payment" className="text-indigo-500 focus:ring-indigo-500 bg-slate-900 border-slate-700" />
                <span className="text-white font-medium">UPI</span>
              </label>
            </div>

            <Button 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 shadow-blue-600/20" 
              onClick={() => handleDonate(amount)}
            >
              Pay ${total.toFixed(2)} securely
            </Button>
            <p className="text-center flex justify-center items-center gap-1 text-xs text-slate-500 mt-4">
              <CheckCircle className="w-3 h-3" /> Secured by Supabase & simulated Razorpay
            </p>
          </div>
        </div>
      </div>
    );
  };

  const PostCastingModal = () => {
    if (!showPostCastingModal) return null;
    const [title, setTitle] = useState('');
    const [roleName, setRoleName] = useState('');
    const [location, setLocation] = useState('');
    const [requirements, setRequirements] = useState('');

    const handleSubmit = () => {
      if (!title || !roleName) return alert("Title and Role are required");
      const newCall = {
        id: Date.now(),
        creator_id: currentUser.id,
        title,
        role_name: roleName,
        location: location || 'Remote',
        dates: 'TBD',
        requirements,
        status: 'Open'
      };
      setCastingCalls([newCall, ...castingCalls]);
      setShowPostCastingModal(false);
      alert("Casting call posted successfully!");
    };

    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
          <button onClick={() => setShowPostCastingModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
          <h2 className="text-2xl font-bold text-white mb-6">Post a Casting Call</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Project / Call Title</label>
              <input type="text" placeholder="e.g. Lead Detective - Neon Shadows" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Role Needed</label>
              <input type="text" placeholder="e.g. Lead Actor, VFX Artist" value={roleName} onChange={e => setRoleName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
              <input type="text" placeholder="e.g. Los Angeles, CA or Remote" value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Requirements & Description</label>
              <textarea rows="3" placeholder="Describe the character or skills needed..." value={requirements} onChange={e => setRequirements(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none" />
            </div>
            <Button className="w-full mt-4" onClick={handleSubmit}>Publish Casting Call</Button>
          </div>
        </div>
      </div>
    );
  };

  const MessageModal = () => {
    if (!showMessageModal || !messageRecipient) return null;
    const [text, setText] = useState('');

    const handleSend = () => {
      if (!text.trim()) return;
      setMessages([{ id: Date.now(), toId: messageRecipient.id, toName: messageRecipient.name, text }, ...messages]);
      setShowMessageModal(false);
      alert(`Message sent to ${messageRecipient.name}!`);
    };

    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
          <button onClick={() => setShowMessageModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
          <h2 className="text-xl font-bold text-white mb-2">Send Message</h2>
          <p className="text-sm text-slate-400 mb-6">To: <span className="text-indigo-400">{messageRecipient.name}</span></p>
          <textarea rows="4" placeholder="Write your message here..." value={text} onChange={e => setText(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none mb-4" />
          <Button className="w-full" onClick={handleSend}>Send Message</Button>
        </div>
      </div>
    );
  };

  const ApplyModal = () => {
    if (!showApplyModal || !applyTarget) return null;
    const [message, setMessage] = useState('');

    const handleApply = () => {
      setApplications([{ id: Date.now(), callId: applyTarget.id, callTitle: applyTarget.title, roleName: applyTarget.role_name, message }, ...applications]);
      setShowApplyModal(false);
      alert("Application submitted successfully!");
    };

    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
          <button onClick={() => setShowApplyModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
          <h2 className="text-xl font-bold text-white mb-2">Apply for Role</h2>
          <p className="text-sm text-slate-400 mb-4">Applying for: <span className="text-indigo-400">{applyTarget.role_name}</span> in {applyTarget.title}</p>
          <textarea rows="4" placeholder="Add a brief cover letter or link to portfolio..." value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:outline-none mb-4" />
          <Button className="w-full" onClick={handleApply}>Submit Application</Button>
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Clapperboard className="w-6 h-6 text-indigo-500" />
          <span className="text-lg font-bold text-white">CineConnect</span>
        </div>
        <p className="text-slate-500 text-sm">© 2026 CineConnect. Crafted for Creators.</p>
        <div className="flex gap-4">
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans text-slate-200 selection:bg-indigo-500/30">
      <Navbar />
      
      <main className="flex-1">
        {currentRoute.path === 'home' && <HomeView />}
        {currentRoute.path === 'discover' && <DiscoverView />}
        {currentRoute.path === 'campaign' && <CampaignDetailView />}
        {currentRoute.path === 'profile' && <ProfileView />}
        {currentRoute.path === 'dashboard' && <DashboardView />}
      </main>

      <Footer />
      <AuthModal />
      <RazorpayMockModal />
      <PostCastingModal />
      <MessageModal />
      <ApplyModal />
    </div>
  );
}