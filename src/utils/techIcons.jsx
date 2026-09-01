import {
  FaJava,
  FaPython,
  FaAws,
  FaDocker,
  FaReact,
  FaEthereum,
  FaBrain,
  FaDatabase,
  FaCodeBranch,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiJavascript,
  SiKotlin,
  SiFlutter,
  SiDjango,
  SiFastapi,
  SiMysql,
  SiFigma,
  SiJira,
  SiCplusplus,
  SiDart,
  SiPostman,
  SiVercel,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";
import {
  Layers,
  Cpu,
  Workflow,
  Sparkles,
  Target,
  Compass,
  Zap,
  Radio,
  Server,
  Terminal,
  BarChart3,
} from "lucide-react";

export function getSkillIcon(skillName, className = "w-4 h-4") {
  const s = (skillName || "").toLowerCase().trim();

  if (s.includes("java") && !s.includes("script")) return <FaJava className={className} />;
  if (s.includes("python")) return <FaPython className={className} />;
  if (s.includes("spring")) return <SiSpringboot className={className} />;
  if (s.includes("aws") || s.includes("ec2") || s.includes("s3")) return <FaAws className={className} />;
  if (s.includes("docker") || s.includes("container")) return <FaDocker className={className} />;
  if (s.includes("react") || s.includes("mern")) return <FaReact className={className} />;
  if (s.includes("javascript")) return <SiJavascript className={className} />;
  if (s.includes("kotlin")) return <SiKotlin className={className} />;
  if (s.includes("flutter")) return <SiFlutter className={className} />;
  if (s.includes("django")) return <SiDjango className={className} />;
  if (s.includes("fast api") || s.includes("fastapi")) return <SiFastapi className={className} />;
  if (s.includes("mysql") || s.includes("sql") || s.includes("relational")) return <SiMysql className={className} />;
  if (s.includes("vector") || s.includes("embeddings") || s.includes("retrieval")) return <Sparkles className={className} />;
  if (s.includes("c++")) return <SiCplusplus className={className} />;
  if (s.includes("dart")) return <SiDart className={className} />;
  if (s.includes("figma") || (s.includes("design") && !s.includes("system"))) return <SiFigma className={className} />;
  if (s.includes("jira") || s.includes("scrum") || s.includes("agile") || s.includes("project management")) return <SiJira className={className} />;
  if (s.includes("tableau") || s.includes("analytics") || s.includes("mixpanel") || s.includes("amplitude")) return <BarChart3 className={className} />;
  if (s.includes("web3") || s.includes("solidity") || s.includes("crypto")) return <FaEthereum className={className} />;
  if (s.includes("machine learning") || s.includes("ai") || s.includes("transformers") || s.includes("neural")) return <FaBrain className={className} />;
  if (s.includes("data science") || s.includes("pipelines")) return <Cpu className={className} />;
  if (s.includes("system design") || s.includes("architecture") || s.includes("microservices")) return <Layers className={className} />;
  if (s.includes("product management") || s.includes("roadmaps") || s.includes("vision")) return <Target className={className} />;
  if (s.includes("ideation") || s.includes("research")) return <Compass className={className} />;
  if (s.includes("development") || s.includes("engineering")) return <Workflow className={className} />;
  if (s.includes("ci/cd") || s.includes("github actions")) return <FaCodeBranch className={className} />;
  if (s.includes("tailwind")) return <SiTailwindcss className={className} />;
  if (s.includes("database")) return <FaDatabase className={className} />;
  if (s.includes("mongodb")) return <SiMongodb className={className} />;
  if (s.includes("websocket")) return <Radio className={className} />;
  if (s.includes("api")) return <SiPostman className={className} />;
  if (s.includes("vercel")) return <SiVercel className={className} />;
  if (s.includes("cloud") || s.includes("infra")) return <Server className={className} />;
  if (s.includes("cli") || s.includes("terminal")) return <Terminal className={className} />;

  return <Zap className={className} />;
}
