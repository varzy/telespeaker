<template>
  <div class="send_photo">
    <el-form label-width="96px">
      <el-form-item label="照片">
        <el-upload
          :file-list="form.photo"
          :auto-upload="false"
          :limit="1"
          action=""
          drag
          :before-upload="onPhotoBeforeUpload"
          :on-change="onPhotoChange"
        >
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="文案">
        <el-input
          :autosize="{ minRows: 8, maxRows: 12 }"
          type="textarea"
          v-model="form.caption"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { reqSendPhoto } from '../api/index';

export default {
  name: 'SendPhoto',

  setup() {
    const form = reactive({
      photo: [],
      caption: '',
    });

    const onPhotoBeforeUpload = () => {
      return false;
    };
    const onPhotoChange = (file, fileList) => {
      console.log(file, fileList);
      form.photo = fileList;
    };
    const onSubmit = async () => {
      const formData = new FormData();
      formData.append('photo', form.photo[0].raw);
      formData.append('caption', form.caption);
      const res = await reqSendPhoto(formData);

      console.log('res', res.data);
    };

    return { form, onPhotoBeforeUpload, onPhotoChange, onSubmit };
  },
};
</script>
