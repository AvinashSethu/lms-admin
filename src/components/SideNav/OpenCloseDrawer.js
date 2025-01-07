import Image from "next/image";

export default function OpenCloseDrawer({ onClick, isOpen }) {
  return (
    <Image
      src="/Icons/Drawer.svg"
      alt="openclose"
      width={24}
      height={24}
      onClick={onClick}
      style={{
        position: "absolute",
        top: "11%",
        right: 0,
        cursor: "pointer",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: "all .4s ease",
      }}
    />
  );
}
