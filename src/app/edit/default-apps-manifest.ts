import { StaticImageData } from 'next/image';

import amazon from '../../../public/app-icons/amazon.png';
import asana from '../../../public/app-icons/asana.png';
import bamboohr from '../../../public/app-icons/bamboohr.png';
import bestbuy from '../../../public/app-icons/bestbuy.png';
import browserstack from '../../../public/app-icons/browserstack.png';
import googlecalendar from '../../../public/app-icons/googlecalendar.png';
import confluence from '../../../public/app-icons/confluence.png';
import craigslist from '../../../public/app-icons/craigslist.png';
import googledocs from '../../../public/app-icons/googledocs.png';
import googledrive from '../../../public/app-icons/googledrive.png';
import ebay from '../../../public/app-icons/ebay.png';
import facebook from '../../../public/app-icons/facebook.png';
import gmail from '../../../public/app-icons/gmail.png';
import google from '../../../public/app-icons/google.png';
import jira from '../../../public/app-icons/jira.png';
import memoryexpress from '../../../public/app-icons/memoryexpress.png';
import messenger from '../../../public/app-icons/messenger.png';
import netflix from '../../../public/app-icons/netflix.png';
import googlephotos from '../../../public/app-icons/googlephotos.png';
import slack from '../../../public/app-icons/slack.png';
import soundcloud from '../../../public/app-icons/soundcloud.png';
import googlesheets from '../../../public/app-icons/googlesheets.png';
import used from '../../../public/app-icons/used.png';
import worldtimebuddy from '../../../public/app-icons/worldtimebuddy.png';
import youtube from '../../../public/app-icons/youtube.png';
import zendesk from '../../../public/app-icons/zendesk.png';
import zoom from '../../../public/app-icons/zoom.png';

export type DefaultAppTypes = {
  name: string;
  url: string;
  icon: StaticImageData;
  active: boolean;
}

export const defaultApps: DefaultAppTypes[] = [
  {
    name: "Amazon",
    url: "https://www.amazon.ca/",
    icon: amazon,
    active: false,
  },
  {
    name: "Asana",
    url: "https://app.asana.com/",
    icon: asana,
    active: false,
  },
  {
    name: "BambooHR",
    url: "https://www.bamboohr.com/",
    icon: bamboohr,
    active: false,
  },
  {
    name: "Best Buy",
    url: "https://www.bestbuy.ca/",
    icon: bestbuy,
    active: false,
  },
  {
    name: "BrowserStack",
    url: "https://www.browserstack.com/",
    icon: browserstack,
    active: false,
  },
  {
    name: "Google Calendar",
    url: "https://calendar.google.com/",
    icon: googlecalendar,
    active: false,
  },
  {
    name: "Confluence",
    url: "https://www.atlassian.com/software/confluence",
    icon: confluence,
    active: false,
  },
  {
    name: "Craigslist",
    url: "https://geo.craigslist.org/",
    icon: craigslist,
    active: false,
  },
  {
    name: "Google Docs",
    url: "https://docs.google.com/",
    icon: googledocs,
    active: false,
  },
  {
    name: "Google Drive",
    url: "https://drive.google.com/",
    icon: googledrive,
    active: false,
  },
  {
    name: "eBay",
    url: "https://www.ebay.ca/",
    icon: ebay,
    active: false,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: facebook,
    active: false,
  },
  {
    name: "Gmail",
    url: "https://mail.google.com/",
    icon: gmail,
    active: false,
  },
  {
    name: "Google",
    url: "https://www.google.ca/",
    icon: google,
    active: false,
  },
  {
    name: "Jira",
    url: "https://www.atlassian.com/software/jira",
    icon: jira,
    active: false,
  },
  {
    name: "Memory Express",
    url: "https://www.memoryexpress.com/",
    icon: memoryexpress,
    active: false,
  },
  {
    name: "Messenger",
    url: "https://www.facebook.com/messages",
    icon: messenger,
    active: false,
  },
  {
    name: "Netflix",
    url: "https://www.netflix.com/browse",
    icon: netflix,
    active: false,
  },
  {
    name: "Google Photos",
    url: "https://photos.google.com/",
    icon: googlephotos,
    active: false,
  },
  {
    name: "Slack",
    url: "https://app.slack.com/client/",
    icon: slack,
    active: false,
  },
  {
    name: "SoundCloud",
    url: "https://soundcloud.com/feed",
    icon: soundcloud,
    active: false,
  },
  {
    name: "Google Sheets",
    url: "https://docs.google.com/spreadsheets/",
    icon: googlesheets,
    active: false,
  },
  {
    name: "Used",
    url: "https://www.used.ca/",
    icon: used,
    active: false,
  },
  {
    name: "World Time Buddy",
    url: "https://www.worldtimebuddy.com/",
    icon: worldtimebuddy,
    active: false,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/",
    icon: youtube,
    active: false,
  },
  {
    name: "Zendesk",
    url: "https://www.zendesk.com/",
    icon: zendesk,
    active: false,
  },
  {
    name: "Zoom",
    url: "https://zoom.us/",
    icon: zoom,
    active: false,
  },
];