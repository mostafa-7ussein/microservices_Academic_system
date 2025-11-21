# LinkedIn Post - Microservices Project

---

🚀 **مشروع Microservices مع Kafka - تحديث وتحسين**

كنت أعمل على مشروع قديم لـ Microservices Architecture وقمت بتحسينه وتطويره بشكل كامل! 

**المشروع:**
نظام أكاديمي مبني على Microservices Architecture يستخدم Kafka كـ Message Broker للتواصل غير المتزامن بين الخدمات.

**البنية المعمارية:**

📚 **Instructor Service** (Port 8080)
- يستقبل طلبات إضافة/حذف الكورسات
- يرسل الأحداث (Events) إلى Kafka Topic
- لا يتصل مباشرة بقاعدة البيانات

🎓 **Student Service** (Port 8081)
- يستقبل الرسائل من Kafka (Consumer)
- ينفذ عمليات CRUD على قاعدة البيانات PostgreSQL
- يوفر واجهة RESTful API للقراءة

📨 **Kafka Message Broker**
- Topic: `topic1`
- يدير التواصل غير المتزامن بين الخدمات
- يضمن Decoupling بين الخدمات

**كيف يعمل النظام:**

1️⃣ العميل يرسل طلب إضافة كورس → Instructor Service
2️⃣ Instructor Service ينشر الحدث إلى Kafka Topic
3️⃣ Student Service (Consumer) يستقبل الحدث من Kafka
4️⃣ Student Service يحفظ البيانات في PostgreSQL
5️⃣ العميل يمكنه قراءة الكورسات من Student Service

**المزايا:**
✅ Event-Driven Architecture
✅ Asynchronous Communication
✅ Loose Coupling بين الخدمات
✅ Scalability - يمكن توسيع كل خدمة بشكل مستقل
✅ Reliability - Kafka يضمن وصول الرسائل

**التكنولوجيات المستخدمة:**
- Node.js & Express.js
- Apache Kafka
- PostgreSQL
- Docker & Docker Compose
- Sequelize ORM
- Kafka-node

**التحسينات التي قمت بها:**
- إصلاح مشاكل PostgreSQL compatibility
- تحسين Docker Compose configuration
- تنظيف الكود وإزالة التعليقات غير الضرورية
- إضافة .gitignore مناسب
- إنشاء README.md احترافي

المشروع متاح على GitHub:
🔗 https://github.com/mostafa-7ussein/microservices_Academic_system

#Microservices #Kafka #NodeJS #Docker #EventDriven #SoftwareArchitecture #BackendDevelopment #PostgreSQL

---

