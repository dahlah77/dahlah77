import {
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaFacebook,
  FaThreads,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaYoutube,
  FaBriefcase
} from 'react-icons/fa6';
import { SiCapcut } from 'react-icons/si';
import { SocialLink } from '../types/content';

export const socialLinks: SocialLink[] = [
  { platform: 'Email', handle: 'YOUR_EMAIL_HERE', url: 'mailto:YOUR_EMAIL_HERE', icon: FaEnvelope },
  { platform: 'WhatsApp', handle: 'WhatsApp', url: 'YOUR_WHATSAPP_LINK', icon: FaWhatsapp },
  { platform: 'Instagram', handle: '@your_instagram', url: 'YOUR_INSTAGRAM_LINK', icon: FaInstagram },
  { platform: 'TikTok', handle: '@your_tiktok', url: 'YOUR_TIKTOK_LINK', icon: FaTiktok },
  { platform: 'X', handle: '@your_x', url: 'YOUR_X_LINK', icon: FaXTwitter },
  { platform: 'Facebook', handle: 'Your Name', url: 'YOUR_FACEBOOK_LINK', icon: FaFacebook },
  { platform: 'Threads', handle: '@your_threads', url: 'YOUR_THREADS_LINK', icon: FaThreads },
  { platform: 'GitHub', handle: 'your_github', url: 'YOUR_GITHUB_LINK', icon: FaGithub },
  { platform: 'LinkedIn', handle: 'your_linkedin', url: 'YOUR_LINKEDIN_LINK', icon: FaLinkedin },
  { platform: 'Telegram', handle: '@your_telegram', url: 'YOUR_TELEGRAM_LINK', icon: FaTelegram },
  { platform: 'CapCut', handle: 'your_capcut', url: 'YOUR_CAPCUT_LINK', icon: SiCapcut },
  { platform: 'YouTube', handle: 'your_channel', url: 'YOUR_YOUTUBE_LINK', icon: FaYoutube },
  { platform: 'Jobstreet', handle: 'your_jobstreet', url: 'YOUR_JOBSTREET_LINK', icon: FaBriefcase },
  { platform: 'Fastwork', handle: 'your_fastwork', url: 'YOUR_FASTWORK_LINK', icon: FaBriefcase }
];
