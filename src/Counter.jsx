import Nullstack from 'nullstack';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import './Counter.css';

class Counter extends Nullstack {

  count = 0

  static async getCount({ secrets }) {
    if (existsSync(secrets.databaseFile)) {
      const json = readFileSync(secrets.databaseFile, 'utf-8');
      return JSON.parse(json).count;
    } else {
      return 0;
    }
  }

  async initiate() {
    this.count = await this.getCount();
  }

  static async setCount({ secrets, count }) {
    const json = JSON.stringify({ count });
    return writeFileSync(secrets.databaseFile, json);
  }

  async increment() {
    this.count++;
    await this.setCount({ count: this.count });
  }

  render() {
    return (
      <button onclick={this.increment}>
        Count: {this.count} (click to increment)
      </button>
    )
  }

}

export default Counter;