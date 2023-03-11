import { createClient, RedisClientType } from 'redis';

export class RedisManager {
  private static instance: RedisManager;
  private redisClient: RedisClientType;

  constructor() {
    RedisManager.instance = this;
    this.redisClient = createClient({
      url: process.env.REDIS_URL,
    });
  }

  static getInstance(): RedisManager {
    if (!RedisManager.instance) {
      return new RedisManager();
    }
    return RedisManager.instance;
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async exists(key: string): Promise<number> {
    return await this.redisClient.exists(key);
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.redisClient.expire(key, seconds);
  }

  async disconnect(): Promise<void> {
    await this.redisClient.quit();
  }

  async connect(): Promise<void> {
    await this.redisClient.connect();
  }
}
