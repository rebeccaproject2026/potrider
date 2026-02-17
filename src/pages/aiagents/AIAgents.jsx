import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ConversationList from "../../components/aiagent/ConversationList";
import ChatWindow from "../../components/aiagent/ChatWindow";
import CustomerDetailsPanel from "../../components/aiagent/CustomerDetailsPanel";
import avtar1 from "../../assets/images/self-portrait-beautiful-chinese-girl 1.png"
import avtar2 from "../../assets/images/self-portrait-beautiful-chinese-girl2.png"
import avtar3 from "../../assets/images/self-portrait-beautiful-chinese-girl3.png"
import avtar4 from "../../assets/images/self-portrait-beautiful-chinese-girl4.png"
const MOCK_CONVERSATIONS = [
  {
    id: "1",
    name: "Jan Doe",
    role: "existing_customer",
    roleLabel: "Existing Customer",
    lastMessage: "omg, this is amazing 😂",
    time: "20m",
    unreadCount: 100,
    status: "human_sent",
    platformIcons: ["outlook", "gmail", "rss", "chat", "whatsapp", "messenger", "tiktok", "linkedin", "telegram", "slack", "instagram"],
    avatar: avtar1,
  },
  {
    id: "2",
    name: "John Doe",
    role: "prospect",
    roleLabel: "Prospect",
    lastMessage: "😍 I like this one, Thanks",
    time: "35m",
    unreadCount: 50,
    status: "new",
    platformIcons: ["outlook", "gmail", "whatsapp"],
    avatar: avtar2,
  },
  {
    id: "3",
    name: "Jane Smith",
    role: "dispatcher",
    roleLabel: "Dispatcher",
    lastMessage: "Can you confirm the delivery window?",
    time: "25 Jul, 2025",
    unreadCount: 9,
    status: "ai_sent",
    platformIcons: ["outlook", "gmail", "chat", "whatsapp", "messenger", "tiktok", "linkedin", "instagram"],
    avatar: avtar3,
  },
  {
    id: "4",
    name: "John Doe",
    role: "staff",
    roleLabel: "Staff",
    lastMessage: "All set for tomorrow.",
    time: "12:20 PM",
    unreadCount: null,
    status: "scheduled",
    platformIcons: ["outlook", "gmail", "slack"],
    avatar: avtar4,
  },
  {
    id: "5",
    name: "John Doe",
    role: "staff",
    roleLabel: "Staff",
    lastMessage: "All set for tomorrow.",
    time: "12:20 PM",
    unreadCount: null,
    status: "scheduled",
    platformIcons: ["outlook", "gmail", "slack"],
    avatar: avtar1,
  },
  {
    id: "6",
    name: "John Doe",
    role: "staff",
    roleLabel: "Staff",
    lastMessage: "All set for tomorrow.",
    time: "12:20 PM",
    unreadCount: null,
    status: "scheduled",
    platformIcons: ["outlook", "gmail", "slack"],
    avatar: avtar2,
  },
  {
    id: "7",
    name: "John Doe",
    role: "staff",
    roleLabel: "Staff",
    lastMessage: "All set for tomorrow.",
    time: "12:20 PM",
    unreadCount: null,
    status: "scheduled",
    platformIcons: ["outlook", "gmail", "slack"],
    avatar: avtar3,
  },
];

const MOCK_MESSAGES = [
  {
    isAgent: false,
    text: "When will my order receive?",
    timestamp: "11:49 AM - 25 Jul, 2025",
    humanResponseButton: false,
  },
  {
    isAgent: true,
    text: "Can you give order number?",
    timestamp: "11:51 AM - 25 Jul, 2025",
    humanResponseButton: false,
    responseType: "Knowledgebase",
  },
  {
    isAgent: false,
    text: "#1234562541",
    timestamp: "11:49 AM - 25 Jul, 2025",
    humanResponseButton: false,
  },
  {
    isAgent: true,
    text: "As I can see in my records you placed an order 30 mins ago. You will receive your order by 10:00 PM Today",
    timestamp: "11:51 AM - 25 Jul, 2025",
    humanResponseButton: false,
    responseType: "AI Response",
  },
  {
    isAgent: false,
    text: "Good to know that, can i connect to Human agent to discuss more about product?",
    timestamp: "11:49 AM - 25 Jul, 2025",
    humanResponseButton: false,
  },
  {
    isAgent: true,
    text: "Sure, Connecting to Human Agent.",
    timestamp: "11:51 AM - 25 Jul, 2025",
    humanResponseButton: false,
    responseType: "AI Response",
  },
  {
    isAgent: true,
    text: "Hi, I am Paul - Online Order Manager from The Leaf Collection, Pickering. How may I assist you today?",
    timestamp: "11:51 AM - 25 Jul, 2025",
    humanResponseButton: false,
    responseType: "Human Response",
  },
  {
    isAgent: false,
    text: "I ordered XYZ product 1 OZ mistakenly can u change it to 1/2 OZ for me?",
    timestamp: "11:49 AM - 25 Jul, 2025",
    humanResponseButton: false,
  },
  {
    isAgent: true,
    text: "Here is your modified order, please pay via e-transfer to pay@potrider.com and share transaction ID to confirm and place your order.",
    timestamp: "11:51 AM - 25 Jul, 2025",
    humanResponseButton: true,
  },
];

const MOCK_ORDER_SUMMARY = {
  products: [
    { name: "Willo Candy Bar", qty: "1/2 OZ", items: "2", total: "$299.99", image: null },
    { name: "Willo Choco Bar", qty: "1 Unit", items: "1", total: "$199.99", image: null },
  ],
  subtotal: "$499.98",
  promocode: "100FF",
  discount: "$5.00",
  potCash: "$4.00",
  storeDiscount: "$4.00",
  total: "$486.98",
  timestamp: "11:51 AM - 25 Jul, 2025",
  showHumanResponse: true,
};

const getCustomerDetails = (conv) => {
  if (!conv) {
    return {
      name: "Jan Doe",
      phone: "+1 123 456 7890",
      lastActive: "20m",
      roleLabel: "Existing Customer",
      avatar: null,
      location: "Las Vegas, Nevada, United States",
      localTime: "06:16 pm local time",
      ordersHistory: {
        totalOrders: "136",
        totalSpending: "$1099.99",
        lastOrderOn: "31 July, 2025 - 05:46 PM",
        lastOrderQty: "12 Items",
        lastOrderAmount: "$199.99",
      },
      additionalInfo: {
        chatDuration: "15m 37s",
        email: "janedoe2020@gmail.com",
        lastSeen: "Today",
      },
    };
  }
  return {
    name: conv.name,
    phone: "+1 123 456 7890",
    lastActive: conv.time,
    roleLabel: conv.roleLabel,
    avatar: conv.avatar,
    location: "Las Vegas, Nevada, United States",
    localTime: "06:16 pm local time",
    ordersHistory: {
      totalOrders: "136",
      totalSpending: "$1099.99",
      lastOrderOn: "31 July, 2025 - 05:46 PM",
      lastOrderQty: "12 Items",
      lastOrderAmount: "$199.99",
    },
    additionalInfo: {
      chatDuration: "15m 37s",
      email: "janedoe2020@gmail.com",
      lastSeen: "Today",
    },
  };
};

const AIAgents = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState("1");
  const [chatInput, setChatInput] = useState("");

  const filteredConversations = useMemo(() => {
    if (!search.trim()) return MOCK_CONVERSATIONS;
    const q = search.trim().toLowerCase();
    return MOCK_CONVERSATIONS.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.lastMessage?.toLowerCase().includes(q) ||
        c.roleLabel?.toLowerCase().includes(q)
    );
  }, [search]);

  const activeConversation = useMemo(
    () => MOCK_CONVERSATIONS.find((c) => c.id === activeId) || filteredConversations[0],
    [activeId, filteredConversations]
  );

  const customerDetails = useMemo(
    () => getCustomerDetails(activeConversation),
    [activeConversation]
  );

  const chatCustomer = useMemo(
    () =>
      activeConversation
        ? {
          name: activeConversation.name,
          avatar: activeConversation.avatar,
          roleLabel: activeConversation.roleLabel,
          lastActive: activeConversation.time,
        }
        : null,
    [activeConversation]
  );

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatInput("");
  };

  const handleViewFullProfile = () => {
    const customerId = activeConversation?.id;
    if (customerId) navigate(`/customers/${customerId}`);
  };

  return (
    <div className="flex flex-1 min-h-0 min-w-0 bg-[#F2F2F2]  gap-2 px-2.5 py-3">
      <ConversationList
        search={search}
        onSearchChange={setSearch}
        conversations={filteredConversations}
        activeId={activeId}
        onSelect={(conv) => setActiveId(conv.id)}
      />

      <ChatWindow
        customer={chatCustomer}
        messages={activeId === "1" ? MOCK_MESSAGES : []}
        orderSummary={activeId === "1" ? MOCK_ORDER_SUMMARY : null}
        onSendMessage={handleSendMessage}
        inputValue={chatInput}
        onInputChange={setChatInput}
      />

      <CustomerDetailsPanel
        customer={customerDetails}
        onViewFullProfile={handleViewFullProfile}
      />
    </div>
  );
};

export default AIAgents;
