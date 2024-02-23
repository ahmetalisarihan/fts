import React from 'react'
import { Button, Flex } from 'antd';

const TeklifButton = () => {
  return (
    <div>
      <Flex gap="small">
      <Button type="primary" href="/teklif-olustur">
        Teklif Al
      </Button>
      </Flex>
    </div>
  )
}

export default TeklifButton