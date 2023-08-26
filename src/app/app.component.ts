import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  useLinkFlickerIn = true;
  loaded = false;
  showFilter = false;
  activeLink: Link|null = null;

  glowPoints = [
    {
      x: 0.5,
      y: 0.5,
      r: 0.2,
    }
  ];

  selectedTags: string[] = [];
  allTags: string[] = [];
  visibleLinks: { link: Link, matches: number }[] = [];

  private links: Link[] = [
    {
      x: 0.6,
      y: 0.25,
      title: 'Poppy Seed Pets',
      description: 'A pet game you can play in yor browser. Your pets act on their own, according to their skills, environments, social networks, and emotional states. No ads; no micro-transactions - just have fun!',
      image: 'poppyseedpets.svg',
      url: 'https://poppyseedpets.com',
      urlText: 'poppyseedpets.com',
      tags: [ 'game', 'simulation', 'JavaScript', 'TypeScript', 'PHP', 'Angular', 'Symfony', 'AWS' ],
    },
    {
      x: 0.75,
      y: 0.35,
      title: 'Word x Word',
      description: 'A battle of wits against a friend, or the computer. Reveal words and discover their common theme before your opponent does. Available on Steam for $15.',
      image: 'wordxword.png',
      url: 'https://store.steampowered.com/app/2225460/Word_x_Word/',
      urlText: 'Get it on Steam',
      tags: [ 'game', 'C#', 'paid', 'Steam' ],
    },
    {
      x: 0.9,
      y: 0.3,
      title: 'Mysterious Space',
      description: 'A side-scrolling arcade shooter with rogue-like elements, including procedurally-generated planets, randomly-generated loot, and permadeath. Features local co-op. Available on Steam for $10.',
      image: 'mysterious-space.png',
      url: 'https://store.steampowered.com/app/368700/Mysterious_Space/',
      urlText: 'Get it on Steam',
      tags: [ 'game', 'C#', 'paid', 'Steam' ],
    },
    {
      x: 0.3,
      y: 0.6,
      title: 'Critter World',
      description: 'An artificial-life program written in Java. The "critters" navigate a world and evolve a neural network via natural selection.',
      image: 'critter-world.png',
      url: '/assets/download/CritterWorldViewer.jar',
      urlText: 'Download Java Jar',
      tags: [ 'simulation', 'Java' ],
    },
    {
      x: 0.7,
      y: 0.8,
      title: 'On the Edge of Candy Space',
      description: 'Made for itch.io\'s CANDY JAM. A short RPG that explores concepts from Ray Kurzweil\'s "The Singularity is Near", and a planet of aggressive candy monsters.',
      image: 'candy-space.png',
      url: 'https://benmakesgames.itch.io/at-the-edge-of-candy-space-a-memory',
      urlText: 'Get it on itch.io',
      tags: [ 'game', 'RPG Maker' ],
    },
    {
      x: 0.55,
      y: 0.55,
      title: 'BenMakesGames on GitHub',
      description: 'Source-code for various projects, including a C# nuget package, JS plug-ins for RPG Maker MV, PsyPets, and more...',
      image: 'github.png',
      url: 'https://github.com/BenMakesGames',
      urlText: 'github.com/BenMakesGames',
      tags: [ 'open-source', 'C#', 'JavaScript', 'TypeScript', 'RPG Maker', 'Angular', 'PHP' ]
    },
    {
      x: 0.2,
      y: 0.7,
      title: 'BenMakesGames on NuGet',
      description: 'NuGet packages, from small utilities, to a game engine framework for MonoGame.',
      image: 'nuget.png',
      url: 'https://www.nuget.org/profiles/BenMakesGames',
      urlText: 'nuget.org/profiles/BenMakesGames',
      tags: [ 'open-source', 'C#' ]
    },
    {
      x: 0.575,
      y: 0.625,
      title: 'BenMakesGames on itch.io',
      description: 'Games in various stages of done-ness, including "Dreams About Squash", "Magical Girl", "Suikomon", and more...',
      image: 'itch-io.png',
      url: 'https://benmakesgames.itch.io',
      urlText: 'benmakesgames.itch.io',
      tags: [ 'RPG Maker', 'game', 'C#', 'C++', 'JavaScript' ]
    },
    {
      x: 0.25,
      y: 0.8,
      title: '★Kindred',
      description: 'An idle kingdom-builder game. Recruit immortal Vassals, send them on epic quests, and build your kingdom.',
      image: 'starkindred.svg',
      url: 'https://starkindred.com',
      urlText: 'starkindred.com',
      tags: [ 'game', 'C#', 'JavaScript', 'TypeScript', 'Angular', 'AWS', 'Azure' ]
    }
  ];

  constructor() { }

  ngOnInit() {
    this.updateVisibleLinks();

    this.allTags = this.links
      .map(l => l.tags)
      .reduce((a, b) => a.concat(b), [])
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
    ;
  }

  private updateVisibleLinks()
  {
    this.visibleLinks = this.links.map(l => {
      return {
        link: l,
        matches: l.tags.filter(i => this.selectedTags.includes(i)).length
      }
    });
  }

  doShowLink(link: Link)
  {
    this.activeLink = link;
  }

  doCloseInfo()
  {
    this.activeLink = null;
  }

  doToggleTag(tag: string)
  {
    this.useLinkFlickerIn = false;

    const tagIndex = this.selectedTags.indexOf(tag);

    if(tagIndex === -1)
      this.selectedTags.push(tag);
    else
      this.selectedTags.splice(tagIndex, 1);

    this.updateVisibleLinks();
  }

}

interface Link {
  x: number;
  y: number;
  title: string;
  description: string;
  image: string;
  url: string;
  urlText: string;
  tags: string[];
}
