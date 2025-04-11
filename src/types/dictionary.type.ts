export type DictionaryItem = {
  word: string;
  sense: {
    target_code: number;
    sense_no: number;
    definition: string;
    pos: string;
    link: string;
    type: string;
  };
};

type Channel = {
  title: string;
  link: string;
  description: string;
  total: number;
  start: number;
  num: number;
  item?: Array<DictionaryItem>;
};

export type DictionaryApiResponse = {
  channel: Channel;
};
