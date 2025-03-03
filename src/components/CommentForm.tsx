import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Card, Input, Icon} from '@rneui/base';
import {StyleSheet} from 'react-native';

type CommentFormData = {
  comment: string;
};

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
}

const CommentForm = ({onSubmit}: CommentFormProps) => {
  const initValues: CommentFormData = {comment: ''};
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: initValues,
  });

  const doSubmitComment = (data: CommentFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Card containerStyle={{borderRadius: 6}}>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Comment is required'},
          minLength: {
            value: 3,
            message: 'Comment must be at least 3 characters',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Add a comment"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            errorMessage={errors.comment?.message}
            rightIcon={
              <Icon
                name="send"
                color="#2089dc"
                size={24}
                onPress={handleSubmit(doSubmitComment)}
              />
            }
          />
        )}
        name="comment"
      />
    </Card>
  );
};

const styles = StyleSheet.create({});

export default CommentForm;
