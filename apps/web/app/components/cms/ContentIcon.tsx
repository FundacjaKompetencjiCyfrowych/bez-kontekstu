import { IconBaseProps } from "react-icons";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
  FaBehance,
  FaTiktok,
  FaSnapchat,
  FaSpotify,
  FaDiscord,
  FaTwitch,
} from "react-icons/fa";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiFilm,
  FiHeadphones,
  FiImage,
  FiCalendar,
  FiCamera,
  FiFileText,
  FiExternalLink,
  FiHash,
} from "react-icons/fi";
import { SiX } from "react-icons/si";

const iconMap = {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
  FaBehance,
  FaTiktok,
  FaSnapchat,
  FaSpotify,
  FaDiscord,
  FaTwitch,
  FiMapPin,
  FiMail,
  FiPhone,
  FiFilm,
  FiHeadphones,
  FiImage,
  FiCalendar,
  FiCamera,
  FiFileText,
  FiExternalLink,
  FiHash,
  SiX,
};

type IconName = keyof typeof iconMap;

export function ContentIcon({ name, ...props }: IconBaseProps) {
  if (!name || name in iconMap === false) return null;
  const IconComponent = iconMap[name as IconName];
  // Icons are decorative by default - parent should provide aria-label if needed
  return <IconComponent {...props} aria-hidden="true" />;
}
