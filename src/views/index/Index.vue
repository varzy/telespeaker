<template>
  <div class="index">
    <a-card title="Bot">
      <a-spin :spinning="isBotLoading">
        <a-descriptions bordered>
          <a-descriptions-item label="Id">{{ bot.id }}</a-descriptions-item>
          <a-descriptions-item label="用户名">@{{ bot.username }}</a-descriptions-item>
          <a-descriptions-item label="名称">{{ bot.first_name }}</a-descriptions-item>
        </a-descriptions>
      </a-spin>
    </a-card>
  </div>
</template>

<script>
import { reqGetMe } from '@/api';
import { reactive, ref } from 'vue';

function useBot() {
  const isBotLoading = ref(false);
  const bot = reactive({
    id: 0,
    username: '',
    first_name: '',
  });

  const getBot = async () => {
    try {
      isBotLoading.value = true;

      const res = await reqGetMe();
      bot.id = res.data.result.id;
      bot.username = res.data.result.username;
      bot.first_name = res.data.result.first_name;
    } finally {
      isBotLoading.value = false;
    }
  };

  return { isBotLoading, bot, getBot };
}

export default {
  name: 'Index',

  setup() {
    const { getBot, ...getBotEffects } = useBot();

    getBot();

    return { ...getBotEffects };
  },
};
</script>
