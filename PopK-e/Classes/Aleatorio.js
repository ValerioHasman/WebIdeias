export default class Aleatorio {
  static entre(min = 0, max = 100) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static rgb() {
    return `#${Aleatorio.entre(50, 200).toString(16)
      }${Aleatorio.entre(50, 200).toString(16)
      }${Aleatorio.entre(50, 200).toString(16)
      }`;
  }
}