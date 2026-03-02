"use client";

import React from "react";
import { Row, Col } from "antd";
import { AppstoreOutlined, HddOutlined, DatabaseOutlined } from "@ant-design/icons";
import { EServerType } from "@/types/enums";
import { useConfigStore } from "@/store/configStore";
import { SelectableCard } from "./SelectableCard";
import { SectionTitle } from "./SectionTitle";

export const ServerTypeSelector: React.FC = () => {
  const { serverType, setServerType } = useConfigStore();

  const serverTypes = [
    {
      id: EServerType.VirtualMachine,
      name: "Virtual Machines",
      desc: "Flexible & Scalable",
      icon: <AppstoreOutlined />,
    },
    {
      id: EServerType.Dedicated,
      name: "Dedicated Servers",
      desc: "Maximum Performance",
      icon: <HddOutlined />,
    },
  ];

  return (
    <section className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <SectionTitle icon={<DatabaseOutlined />}>Type of Server</SectionTitle>
      <Row gutter={[16, 16]}>
        {serverTypes.map((item) => (
          <Col span={12} sm={12} key={item.id}>
            <SelectableCard
              isSelected={serverType === item.id}
              onClick={() => setServerType(item.id)}
              icon={item.icon}
              title={item.name}
              description={item.desc}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
};
