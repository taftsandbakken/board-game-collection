export interface BoardGame {
  name: { _text: string };
  thumbnail: { _text: string };
  stats: {
    _attributes: {
      minplayers: string;
      maxplayers: string;
      minplaytime: string;
      maxplaytime: string;
    };
  };
  status: {
    _attributes: {
      wishlistpriority: string;
    }
  }
  yearpublished: {
    _text: string;
  }
}
