import { Injectable } from '@nestjs/common';
import { IS_SHARED_WORKING } from '@league-matchups/shared';

@Injectable()
export class AppService {
  getHello(): string {
    return IS_SHARED_WORKING;
  }

  async postureCheck(): Promise<void> {
    const discordURL =
      'https://discord.com/api/webhooks/1539905095272103936/cHoHjh39UoX6VPi1IMHaRhpXTIbH7kir_yoxmCDkVk6Nhk7TagbWhhe6AW6izxqGZNDF';
    const message = {
      content: "Don't let you posture tank your elo!",
    };

    const response = await fetch(discordURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    console.log('Discord Status:', response.status);
  }
}
