import { v4 as uuidv4 } from "uuid";
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

export type AppTypes = {
  details: AppDetailsTypes;
  id: string;
  active: boolean;
  tip?: string;
}

type AppDetailsTypes = {
  name: string;
  url: string;
  icon: StaticImageData;
}

export const apps: AppTypes[] = [
  {
    details: {
      name: "Amazon",
      url: "https://www.amazon.ca/",
      icon: amazon,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Asana",
      url: "https://app.asana.com/",
      icon: asana,
    },
    id: uuidv4(),
    active: true,
    tip: `Change the URL to your personal Asana account`
  },
  {
    details: {
      name: "BambooHR",
      url: "https://www.bamboohr.com/",
      icon: bamboohr,
    },
    id: uuidv4(),
    active: true,
    tip: `Change the URL to your BambooHR organization`
  },
  {
    details: {
      name: "Best Buy",
      url: "https://www.bestbuy.ca/",
      icon: bestbuy,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "BrowserStack",
      url: "https://www.browserstack.com/",
      icon: browserstack,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Google Calendar",
      url: "https://calendar.google.com/",
      icon: googlecalendar,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Confluence",
      url: "https://www.atlassian.com/software/confluence",
      icon: confluence,
    },
    id: uuidv4(),
    active: true,
    tip: `Change the URL to your Confluence organization`
  },
  {
    details: {
      name: "Craigslist",
      url: "https://geo.craigslist.org/",
      icon: craigslist,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Google Docs",
      url: "https://docs.google.com/",
      icon: googledocs,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Google Drive",
      url: "https://drive.google.com/",
      icon: googledrive,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "eBay",
      url: "https://www.ebay.ca/",
      icon: ebay,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Facebook",
      url: "https://www.facebook.com/",
      icon: facebook,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Gmail",
      url: "https://mail.google.com/",
      icon: gmail,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Google",
      url: "https://www.google.ca/",
      icon: google,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Jira",
      url: "https://www.atlassian.com/software/jira",
      icon: jira,
    },
    id: uuidv4(),
    active: true, 
    tip: `Change the URL to your Jira organization`
  },
  {
    details: {
      name: "Memory Express",
      url: "https://www.memoryexpress.com/",
      icon: memoryexpress,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Messenger",
      url: "https://www.facebook.com/messages",
      icon: messenger,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Netflix",
      url: "https://www.netflix.com/browse",
      icon: netflix,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Google Photos",
      url: "https://photos.google.com/",
      icon: googlephotos,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Slack",
      url: "https://app.slack.com/client/",
      icon: slack,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "SoundCloud",
      url: "https://soundcloud.com/feed",
      icon: soundcloud,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Google Sheets",
      url: "https://docs.google.com/spreadsheets/",
      icon: googlesheets,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Used",
      url: "https://www.used.ca/",
      icon: used,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "World Time Buddy",
      url: "https://www.worldtimebuddy.com/",
      icon: worldtimebuddy,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "YouTube",
      url: "https://www.youtube.com/",
      icon: youtube,
    },
    id: uuidv4(),
    active: true, 
  },
  {
    details: {
      name: "Zendesk",
      url: "https://www.zendesk.com/",
      icon: zendesk,
    },
    id: uuidv4(),
    active: true, 
    tip: `Change the URL to your Zendesk organization`
  },
  {
    details: {
      name: "Zoom",
      url: "https://zoom.us/",
      icon: zoom,
    },
    id: uuidv4(),
    active: true, 
  },
];