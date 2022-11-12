export type Explore = {
  img: string;
  location: string;
  distance: string;
}

export type Cards = {
  img: string;
  title: string;
}

export type Props = {
  exploreData: Explore[];
  cardsData: Cards[]
}

export type LargeCard = {
  img: string;
  title: string;
  description: string;
  buttonText: string;
}