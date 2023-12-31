import { setFailed } from '@actions/core'
import { getInputs } from './utils';
import { Notification } from './notification';

function main() {
  try {
    const inputs = getInputs();

    const notification = new Notification(inputs);

    if (!inputs.discord_webhook && !inputs.slack_webhook) {
      setFailed('You must provide at least one webhook.')
    }

    if (inputs.discord_webhook) {
      notification.sendDiscordNotification();
    }

    if (inputs.slack_webhook) {
      notification.sendSlackNotification();
    }

    if (inputs.telegram_bot_token && inputs.telegram_chat_id) {
      notification.sendTelegramNotification();
    }

  } catch (error: any) {
    setFailed(error.message)
  }
}

main()
