import { Button, Form, FormProps, Input, InputNumber, InputProps } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import PhoneCodeSelect, { PhoneCodeOption } from '../../components/PhoneCodeSelect';
import Page from '../../layout/mobile/Page';
import styles from './Auth.module.scss';

const FIELDS = {
  code: 'code',
  number: 'number',
};

type ArgsType = {
  // TODO: specify
  code: number;
  number: number;
};

const Auth = () => {
  return (
    <Page className={styles.page}>
      <AuthForm />
    </Page>
  );
};

export default Auth;

const NUMBER_REGEX = /^\d+$/;

const AuthForm = () => {
  const [t] = useTranslation('common');
  const [form] = Form.useForm<ArgsType>();
  const code = Form.useWatch(FIELDS.code, form);

  const onChangePhoneCode = (option: PhoneCodeOption) => {
    form.setFieldValue(FIELDS.code, option.numberCode);
  };

  const onFinish: FormProps['onFinish'] = (values) => {
    console.log('TODO: values>>', values);
  };

  return (
    <div className={styles.authForm}>
      <h2 className={styles.welcome}>{t('auth.welcome')}</h2>

      <Form name="auth" form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name={FIELDS.code}
          rules={[{ required: true, message: t('generic.form.rules.fieldRequired').toString() }]}
        >
          <PhoneCodeSelect onChange={onChangePhoneCode} />
        </Form.Item>

        <Form.Item
          name={FIELDS.number}
          rules={[{ required: true, message: t('generic.form.rules.fieldRequired').toString() }]}
        >
          <Input size="large" placeholder={t('auth.phoneNumber') || ''} type="number" prefix={code ? `+${code}` : ''} />
        </Form.Item>

        <Form.Item className={styles.weWillTextYou}>
          <span>{t('auth.weWillTextYou')}</span>

          <Link to={'/privacy_policy'}> {t('auth.privacyPolicy')}</Link>
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" block htmlType="submit">
            {t('generic.continue')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
