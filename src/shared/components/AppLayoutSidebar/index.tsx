import { ActionIcon, Flex, Paper, Text, Tooltip } from "@mantine/core";
import { IconBubble, IconSettings2 } from "@tabler/icons-react";
import { startTransition } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const APPLICATION_ITEMS = [
  {
    key: `/`,
    title: (
      <>
        <Text size="sm">Conversation</Text>
      </>
    ),
    icon: <IconBubble size={20} />,
  },
  {
    key: `/settings`,
    title: (
      <>
        <Text size="sm">Settings</Text>
      </>
    ),
    icon: <IconSettings2 />,
  },
];

type AppLayoutSidebarButtonProps = {
  item: (typeof APPLICATION_ITEMS)[0];
  active?: boolean;
};

function AppLayoutSidebarButton({ item, active }: AppLayoutSidebarButtonProps) {
  const navigate = useNavigate();
  function handleClick() {
    startTransition(() => {
      navigate(item.key);
    });
  }
  return (
    <Tooltip
      position="right"
      label={item.title}
      transitionProps={{
        transition: "fade-right",
        duration: 300,
        enterDelay: 200,
      }}
      offset={20}
      zIndex={998}
    >
      <ActionIcon
        onClick={handleClick}
        size={"32px"}
        variant={active ? `light` : `subtle`}
        children={item.icon}
      />
    </Tooltip>
  );
}

export type AppLayoutSidebarProps = {
  defaultActiveKey?: string;
};

export default function AppLayoutSidebar({
  defaultActiveKey,
}: AppLayoutSidebarProps) {
  // const isActive = u
  const { pathname } = useLocation();

  return (
    <Paper
      className="app-layout-sidebar-skeleton z-[9999]"
      // fixed the size
      mih={"100vh"}
      mah={"100vh"}
      withBorder
      radius={0}
      w={"64px"}
      p={".8rem"}
      shadow="sm"
    >
      <Flex direction={`column`} gap={12} align={`center`}>
        {APPLICATION_ITEMS.map((item) => {
          return (
            <AppLayoutSidebarButton
              key={item.key}
              item={item}
              active={pathname === item.key}
            />
          );
        })}
      </Flex>
    </Paper>
  );
}
