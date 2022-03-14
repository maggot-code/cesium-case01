# 依赖关系
user
 ↓
components
 ↓
hooks(External) 服务规则, 遵循依赖注入
 ↓
interface(Interface Adapters) 适配规则, 实现外部与业务规则的对接, 遵循依赖反转
 ↓
service(Use Case) 业务规则, 对实体规则的编排
 ↓
domain(Entities) 实体规则, 充血模型

# 领域模型