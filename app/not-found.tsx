import React from 'react';
import { Button, Result } from 'antd';

const NotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Anlaşılan aradığınız ürünü bulamadık."
    extra={<Button type="primary" href='/'>Anasayfa</Button>}
  />
);

export default NotFound;