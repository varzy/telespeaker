<template>
  <div class="messenger">
    <a-card>
      <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="消息类型">
          <a-radio-group v-model:value="currentType">
            <a-radio-button v-for="type in formTypes" :key="type.value" :value="type.value">{{
              type.label
            }}</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 2 }">
          <a-button type="primary" @click="onSubmit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>

    <a-card class="form">
      <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="标签">
          <a-tag
            closable
            class="tag"
            v-for="tag in form.tags"
            :key="tag.id"
            @close="onTagClose(tag)"
            >{{ tag.label }}</a-tag
          >

          <a-input
            v-if="isTagInputting"
            ref="tagInputRef"
            v-model:value="inputtingTag"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            @blur="handleTagInputted"
            @keyup.enter="handleTagInputted"
          />
          <a-button v-else size="small" type="dashed" @click="onTagInput">添加</a-button>
        </a-form-item>
        <a-form-item label="文字内容">
          <a-textarea
            :auto-size="{ minRows: 6, maxRows: 12 }"
            v-model:value="form.text"
          ></a-textarea>
        </a-form-item>

        <!-- start: 图片 -->

        <!-- end: 图片 -->
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { nextTick, reactive, ref } from 'vue';
import { reqSendPhoto } from '../../api/index';
import { uuid } from '@/utils/helpers';

function useFormTypes() {
  const formTypes = [
    { label: '图片消息', value: 'PHOTO', handler: usePhotoForm },
    { label: '文本消息', value: 'MESSAGE', handler: useMessageForm },
  ];
  const currentType = ref('PHOTO');

  return { currentType, formTypes };
}

function useForm() {
  const tagInputRef = ref();
  const isTagInputting = ref(false);
  const inputtingTag = ref('');
  const form = reactive({
    tags: [],
    text: '',
  });

  const onTagClose = (targetTag) => {
    form.tags = form.tags.filter((tag) => tag.id !== targetTag.id);
  };
  const onTagInput = () => {
    isTagInputting.value = true;
    nextTick(() => {
      tagInputRef.value.focus();
    });
  };
  const handleTagInputted = () => {
    if (inputtingTag.value) form.tags = [...form.tags, { id: uuid(), label: inputtingTag.value }];
    isTagInputting.value = false;
    inputtingTag.value = '';
  };

  return {
    tagInputRef,
    isTagInputting,
    inputtingTag,
    form,
    onTagClose,
    onTagInput,
    handleTagInputted,
  };
}

function usePhotoForm() {
  const { form } = useForm();

  const validate = () => {};
  const submit = async () => {
    const formData = new FormData();
    formData.append('caption', form.text);
    const res = await reqSendPhoto(formData);

    console.log('res', res.data);
  };

  return { validate, submit };
}

function useMessageForm() {
  const validate = () => {};
  const submit = () => {};

  return { validate, submit };
}

export default {
  name: 'Messenger',

  setup() {
    const { currentType, formTypes, ...formTypesEffects } = useFormTypes();

    const onSubmit = async () => {
      const currentFormType = formTypes.find((formType) => formType.value === currentType.value);
      console.log(currentFormType.handler);
    };

    return { currentType, formTypes, ...formTypesEffects, onSubmit, ...useForm() };

    // const form = reactive({
    //   photo: [],
    //   caption: '',
    // });
    //
    // const onPhotoBeforeUpload = () => {
    //   return false;
    // };
    // const onPhotoChange = (file, fileList) => {
    //   console.log(file, fileList);
    //   form.photo = fileList;
    // };
    // const onSubmit = async () => {
    //   const formData = new FormData();
    //   formData.append('photo', form.photo[0].raw);
    //   formData.append('caption', form.caption);
    //   const res = await reqSendPhoto(formData);
    //
    //   console.log('res', res.data);
    // };
  },
};
</script>

<style scoped lang="scss">
.messenger {
  .form {
    margin-top: 8px;

    .tag {
      margin-bottom: 2px;
    }
  }
}
</style>
