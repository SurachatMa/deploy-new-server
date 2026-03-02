"use client";

import React from "react";
import { Row, Col } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import { ISku } from "@/hooks/usePriceEstimation";
import { useConfigStore } from "@/store/configStore";
import { SelectableCard } from "./SelectableCard";
import { SectionTitle } from "./SectionTitle";

interface ISkuSelectorProps {
  availableSkus: ISku[];
}

export const SkuSelector: React.FC<ISkuSelectorProps> = ({ availableSkus }) => {
  const { selectedSkuId, setSelectedSkuId } = useConfigStore();

  return (
    <section className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
      <SectionTitle icon={<ThunderboltOutlined />}>Server Instance / SKU</SectionTitle>
      <Row gutter={[16, 16]}>
        {availableSkus.map((item) => (
          <Col span={12} sm={8} key={item.sku}>
            <SelectableCard
              isSelected={selectedSkuId === item.sku}
              onClick={() => setSelectedSkuId(item.sku)}
              icon={null}
              title={item.name}
              description={`${item.cpu} vCPU / ${item.ram}GB RAM\n${item.disk}GB Disk`}
              showTopBar={true}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
};
