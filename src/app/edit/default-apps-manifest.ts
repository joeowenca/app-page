import { StaticImageData } from 'next/image';

import amazon from '../../public/app-icons/amazon.png';
import asana from '../../public/app-icons/asana.png';
import bamboohr from '../../public/app-icons/bamboohr.png';
import bestbuy from '../../public/app-icons/bestbuy.png';
import browserstack from '../../public/app-icons/browserstack.png';
import googlecalendar from '../../public/app-icons/googlecalendar.png';
import confluence from '../../public/app-icons/confluence.png';
import craigslist from '../../public/app-icons/craigslist.png';
import googledocs from '../../public/app-icons/googledocs.png';
import googledrive from '../../public/app-icons/googledrive.png';
import ebay from '../../public/app-icons/ebay.png';
import facebook from '../../public/app-icons/facebook.png';
import gmail from '../../public/app-icons/gmail.png';
import google from '../../public/app-icons/google.png';
import jira from '../../public/app-icons/jira.png';
import memoryexpress from '../../public/app-icons/memoryexpress.png';
import messenger from '../../public/app-icons/messenger.png';
import netflix from '../../public/app-icons/netflix.png';
import googlephotos from '../../public/app-icons/googlephotos.png';
import slack from '../../public/app-icons/slack.png';
import soundcloud from '../../public/app-icons/soundcloud.png';
import googlesheets from '../../public/app-icons/googlesheets.png';
import used from '../../public/app-icons/used.png';
import worldtimebuddy from '../../public/app-icons/worldtimebuddy.png';
import youtube from '../../public/app-icons/youtube.png';
import zendesk from '../../public/app-icons/zendesk.png';
import zoom from '../../public/app-icons/zoom.png';

export type DefaultAppTypes = {
  name: string;
  url: string;
  icon: StaticImageData;
}

export const defaultApps: DefaultAppTypes[] = [
  {
    name: "Amazon",
    url: "https://www.amazon.ca/",
    icon: amazon,
  },
  {
    name: "Asana",
    url: "https://app.asana.com/",
    icon: asana,
  },
  {
    name: "BambooHR",
    url: "https://www.bamboohr.com/",
    icon: bamboohr,
  },
  {
    name: "Best Buy",
    url: "https://www.bestbuy.ca/",
    icon: bestbuy,
  },
  {
    name: "BrowserStack",
    url: "https://www.browserstack.com/",
    icon: browserstack,
  },
  {
    name: "Google Calendar",
    url: "https://calendar.google.com/",
    icon: googlecalendar,
  },
  {
    name: "Confluence",
    url: "https://www.atlassian.com/software/confluence",
    icon: confluence,
  },
  {
    name: "Craigslist",
    url: "https://geo.craigslist.org/",
    icon: craigslist,
  },
  {
    name: "Google Docs",
    url: "https://docs.google.com/",
    icon: googledocs,
  },
  {
    name: "Google Drive",
    url: "https://drive.google.com/",
    icon: googledrive,
  },
  {
    name: "eBay",
    url: "https://www.ebay.ca/",
    icon: ebay,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: facebook,
  },
  {
    name: "Gmail",
    url: "https://mail.google.com/",
    icon: gmail,
  },
  {
    name: "Google",
    url: "https://www.google.ca/",
    icon: google,
  },
  {
    name: "Jira",
    url: "https://www.atlassian.com/software/jira",
    icon: jira,
  },
  {
    name: "Memory Express",
    url: "https://www.memoryexpress.com/",
    icon: memoryexpress,
  },
  {
    name: "Messenger",
    url: "https://www.facebook.com/messages",
    icon: messenger,
  },
  {
    name: "Netflix",
    url: "https://www.netflix.com/browse",
    icon: netflix,
  },
  {
    name: "Google Photos",
    url: "https://photos.google.com/",
    icon: googlephotos,
  },
  {
    name: "Slack",
    url: "https://app.slack.com/client/",
    icon: slack,
  },
  {
    name: "SoundCloud",
    url: "https://soundcloud.com/feed",
    icon: soundcloud,
  },
  {
    name: "Google Sheets",
    url: "https://docs.google.com/spreadsheets/",
    icon: googlesheets,
  },
  {
    name: "Used",
    url: "https://www.used.ca/",
    icon: used,
  },
  {
    name: "World Time Buddy",
    url: "https://www.worldtimebuddy.com/",
    icon: worldtimebuddy,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/",
    icon: youtube,
  },
  {
    name: "Zendesk",
    url: "https://www.zendesk.com/",
    icon: zendesk,
  },
  {
    name: "Zoom",
    url: "https://zoom.us/",
    icon: zoom,
  },
];