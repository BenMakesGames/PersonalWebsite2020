import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showFilter = false;
  activeLink: Link;

  glowPoints = [
    {
      x: 0.5,
      y: 0.5,
      r: 0.2,
    }
  ];

  selectedTags: string[] = [];
  allTags: string[];
  visibleLinks: { link: Link, matches: number }[];

  private links: Link[] = [
    {
      x: 0.6,
      y: 0.25,
      title: 'Poppy Seed Pets',
      description: 'An idle pet game where your pets act on their own, according to their skills, environments, social networks, and emotional states. Free-to-play. No ads. No micro-transactions. Just have fun!',
      image: 'poppyseedpets.svg',
      url: 'https://poppyseedpets.com',
      urlText: 'poppyseedpets.com',
      tags: [ 'game', 'simulation', 'JavaScript', 'PHP', 'Angular', 'Symfony' ],
    },
    {
      x: 0.9,
      y: 0.3,
      title: 'Mysterious Space',
      description: 'A side-scrolling arcade shooter with rogue-like elements, including procedurally-generated planets, randomly-generated loot, and permadeath. Features local co-op. Available on Steam for $10.',
      image: 'mysterious-space.png',
      url: 'https://store.steampowered.com/app/368700/Mysterious_Space/',
      urlText: 'Get it on Steam',
      tags: [ 'game', 'C#', 'paid' ],
    },
    {
      x: 0.3,
      y: 0.6,
      title: 'Critter World',
      description: 'An artifical-life program written in Java. The "critters" navigate a world and evolve a neural network via natural selection.',
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
      tags: [ 'open-source', 'C#', 'JavaScript', 'RPG Maker', 'Angular', 'PHP' ]
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
