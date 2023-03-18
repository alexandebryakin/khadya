import { Button, Form, FormProps, Input, notification } from 'antd';
import { DotLoading } from 'antd-mobile';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Status,
  UpdateCurrentUserInfoMutationVariables,
  useUpdateCurrentUserInfoMutation,
} from '../../../api/graphql.types';
import useToggler from '../../../hooks/useToggler';
import { BottomPanels } from '../../../layout/mobile/Layout';
import Page from '../../../layout/mobile/Page';
import { useBottomPanel } from '../../../lib/BottomPanel';
import { useAuth } from '../../../providers/AuthProvider';
import styles from './PersonalInfo.module.scss';

const FIELDS = {
  firstName: 'firstName',
  lastName: 'lastName',
};

const PersonalInfoForm = () => {
  const [t] = useTranslation('common');
  const auth = useAuth();
  const [form] = Form.useForm<UpdateCurrentUserInfoMutationVariables>();
  const [updateCurrentUserInfo, { loading: updating }] = useUpdateCurrentUserInfoMutation();
  const touched = useToggler();

  const onFinish: FormProps<UpdateCurrentUserInfoMutationVariables>['onFinish'] = async (variables) => {
    const response = await updateCurrentUserInfo({ variables });

    const data = response.data?.updateCurrentUserInfo;

    if (data?.status === Status.Success) {
      auth.setUser(data.user);
      touched.off();
    } else {
      notification.error({ message: t('profile.errors.failedToSaveUserInfo') });
    }
  };

  return (
    <Form<UpdateCurrentUserInfoMutationVariables>
      name="phone"
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFieldsChange={touched.on}
      autoComplete="off"
      initialValues={{
        firstName: auth.user.firstName,
        lastName: auth.user.lastName,
      }}
    >
      <Form.Item
        label={t('profile.firstName')}
        requiredMark={'optional'}
        name={FIELDS.firstName}
        rules={[{ required: true, message: t('generic.form.rules.fieldRequired').toString() }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item label={t('profile.lastName')} requiredMark={'optional'} name={FIELDS.lastName}>
        <Input size="large" />
      </Form.Item>

      <Form.Item>
        <Button size="large" type="primary" block htmlType="submit" disabled={touched.isOff}>
          {updating ? <DotLoading color="white" /> : t('generic.save')}
        </Button>
      </Form.Item>
    </Form>
  );
};

const PersonalInfo = () => {
  const [t] = useTranslation('common');
  const { actions, outlets } = useBottomPanel();

  React.useEffect(() => {
    const prevOutletKey = outlets.current?.key || BottomPanels.BOTTOM_MENU;
    actions.render(BottomPanels.NOTHING);

    return () => actions.render(prevOutletKey);
  }, [actions, outlets]);

  return (
    <div>
      <Page.TopPanel />

      <Page>
        <Page.Header>{t('profile.personalInfo')}</Page.Header>

        <div>
          <PersonalInfoForm />
        </div>
      </Page>
    </div>
  );
};

export default PersonalInfo;
