
# **GramShiksha: Providing Fast Education To Remotest Places**  

## **Problem Statement And Team Details (WITH ID 9804)**
![image](https://github.com/user-attachments/assets/312049de-4b10-4c8f-bee6-e7ed2e58c614)

- **TEAM LEADER: SNEHA JAIN**
- **TEAM NAME: @CYBER WARDENS**
- **TEAM ID: 9804**
- Contributers:
- Sneha Jain
- Pratham Gadkari
- Suraj Chavan
- Siddhartha Chakrabarty
- Sakshi Salunke
- Anuj Tadkase

![image](https://github.com/user-attachments/assets/07b289e6-fa25-477f-a049-de0edfa18c7f)
![WhatsApp Image 2024-12-06 at 12 23 59 AM](https://github.com/user-attachments/assets/2bf7caa2-95ed-45c0-9170-20d6d695dd8a)



| #  | Index                                                                                                              |
|----|--------------------------------------------------------------------------------------------------------------------|
| 1  | [Problem Statement](#problem-statement-and-team-detailswith-id-9804)                                                                            |
| 2  | [Some Considerations](#some-considerations-before-we-begin)                                                        |
| 3  | [Problems](#what-are-the-problems)                                                                                 |
| 4  | [Our Focus Considering These Problems](#our-focus-considering-these-problems)                                       |
| 5  | [Project Division](#with-these-things-in-mind-we-have-divided-our-project-into-2-parts)                             |
| 6  | [Unique Selling Propositions (USPs)](#our-unique-selling-propositions-usps)                                         |
| 7  | [Uniqueness of Our Solution](#uniqueness-of-our-solution)                                                          |
| 8  | [Architecture and Use Cases](#architecture-and-use-cases)                                                          |
| 9  | [Methodology & Technology Stack](#methodology-tech-stack)                                                          |
| 10 | [Research on Low Latency Video Streaming](#our-research-on-low-latency-video-streaming)                             |
| 11 | [Plan Part 1: Smartboard + Pre-Downloaded PPT + Audio](#plan-part-1--smartboard--pre-downloaded-ppt--audio-100mb)   |
| 12 | [Plan Part 2: Engagement Enhancer Module](#plan-part-2--engagement-enhancer-module-major-data-consumption-will-only-be-in-retrieval-of-resources) |
| 13 | [Advantages of Azure CDN for Remote Education](#advantages-of-azure-cdn-for-remote-education)                       |
|14  | [AI-Resource Generation: HOW WE ENSURE EFFICIENT AND LOW DATA CONSUMPTION](#ai-resource-generation-how-we-ensure-efficient-and-low-data-consumption)  |
| 15 | [Low Latency Platform](#low-latency-platform)                                                                      |
| 16 | [Present Implementation](#present-implementation)                                                                  |
| 17 | [Next Implementation](#next-implementation)                                                                  |
| 18 | [BUSINESS RELEVANCE](#BUSINESS-RELEVANCE)                                                                          |
| 19 | [Impact And Benefits](#Impact-And-Benefits)                                                                        |
| 20 | [DEMO VIDEO](#DEMO-VIDEO)                                                                                          |
| 21 | [FeedbackForm](#feedbackform)                                                                                     |



## **Some Considerations before we begin**
- We are assuming that teachers are given sufficient resources/internet and also infra facilities to stream lectures
- Our Understanding is that we are providing remote education to students until government has enough data on student demographics/attendance etc to provide proper infrastructure to the students.

## **WHAT ARE THE PROBLEMS??**
![Problemstatement](https://github.com/user-attachments/assets/f9b42f51-fe85-460f-b3e3-b579f2dc44d1)


## **OUR FOCUS CONSIDERING THESE PROBLEMS**

1. **Provide AI-Generated Resources:** Provide a one-stop solution for teachers and students with AI-generated resources, saving time and cost compared to physical resources.
2. **Implement Low-Internet Services:** Develop solutions that function well with limited internet connectivity.
3. **Enhance Engagement(MAJOR PROBLEM IN ONLINE EDUCATION):** Even if we provide all resources , many students dont really utilize these things, so we have various modules to encourage students to learn.
4. **Identify At-Risk Students:** Help identify students who are weaker, have lower attendance, or are at risk of dropping out and improve engagement by 1 on 1 counselling by teachers.
5. **Analytics for Decision Making:** Provide detailed analytics on student demographics to aid in decision-making and resource allocation by government

## **With these things in mind We have divided our project into 2 parts**
- **1)Live ( low latency ) streaming of video lectures Module with use of websockets/webrtc.**
- Here students will just join classroom and teacher would teach like in a regular meet but through low data consumption and better human interaction.
- **2)PreRecorded Lecture VideoPlayback/Engagement Enhancer Module using Azure CDN( low data consumption)**
- Here there is loads of ai generated resources, engagement enhancing resources which generate interests in learning and all given through lowest data consumption on a prerecorded lecture.

## **Our Unique Selling Propositions (USPs)**
## 1)) LOW LATENCY AND LOW DATA LIVE STREAMING OF LECTURES

![lowlatency](https://github.com/user-attachments/assets/b5523acc-8b3d-4441-89e0-ac4326f7a093)
## 2)) ENGAGEMENT ENHANCER MODULE LOW DATA AI RESOURCE GENERATION
![USP](https://github.com/user-attachments/assets/aafa9723-c2b1-4045-a1a0-e4e9f650b791)

## **UNIQUENESS OF OUR SOLUTION**
1. **Lower Internet Consumption for Live Steams:(research is given below)**
   - Provides remote online classes using just **60-100 MB** of data per hour, compared to typical 600 MB-1 GB.
1. **AI Resource generation at lowest data and retrieval at lowest latency:(research is given below)**
   - With the use of **Azure CDN** and prestorage of the  ai generated resources in **Azure Blob and MongoDB Atlas** while uploading the video , consumption on student side is reduced, only consumption is for 
     retrieval of databases.
2. **Adaptive Learning Quiz Module:**
   - Developed an adaptive learning quiz system where the difficulty of the next question is determined by previously answered questions.
3. **Individual Attention and Counseling:**
   - Focus on weaker students through engagement, score, and attendance analytics. Offers 1-to-1 counseling and doubt sessions.
4. **Visualization of Key Concepts:**
   - Generation of images related to key concepts, helping students visualize key points.
5. **After-Class Comprehensive Notes:**
   - Streamlined post-lecture review with AI-generated class notes, mind maps, and flowcharts.
6. **RAG-Based Doubt Assistant:**
   - Introduce a RAG-based chatbot trained on platform content to swiftly address student queries.
7. **Vocational Learning AI Avatar:**
   - Helps students choose careers, assists in personality development, and vocational learning.

## **ARCHITECTURE AND USE CASES(PLEASE ZOOM IN/SCROLL IN)**

![SIH2024-Page-1 drawio (4)](https://github.com/user-attachments/assets/e9ce8663-2737-4c5e-839a-228eec0dbc7d)



## **USER FLOW**
![SIH2024smalldiagram drawio (4)](https://github.com/user-attachments/assets/d7059509-b558-494e-a98f-6e495eae58ae)

### Teacher Side
- **Online Lecture and Recorded Lecture:**
  - Conduct live classes using smart boards and streaming technologies (e.g., WebRTC).
  - Record lectures for later access; lectures are stored in cloud services (e.g., Azure CDN).

- **Teacher Dashboard:**
  - **Time Table Generation:** Create and manage class schedules.
  - **Student Management:**
    - Generate personal reports for students.
    - Track attendance and monitor student engagement.
    - Send SMS for lectures to parents application.
    - Student Demographics, location and resource management
  - **Feedback Mechanism:** Receive insights on student performance, including dropout risk scores.

- **AI-Generated Resources Storage(RAG BASED ):**
  - AI-generated resources (e.g., images, quizzes) are created once and stored in:
    - **MongoDB:** For structured data storage.
    - **Microsoft Azure Blob Storage:** For storing large files and assets.

### Student Side
- **Engagement Enhancer Module: (ALL RAGS BASED)**
  - **Adaptive Quiz with timely engaement monitoring:** Generate quizzes that adapt in difficulty based on student performance at interval at 2-5 minutes.
  - **Image Generation:** Create visual aids passing relevant keywords and key sentences from viddeo to  Stable Diffusion image generation model.
  - **Mind Map Generation:** Generate mind maps to visualize concepts for better understanding.
  - **AI Avatar:** Provide interactive support for vocational learning and personality development.
  - **Illustrated Notes:** Deliver structured notes including titles, subheadings, summaries, and flowcharts.

### Overall Flow
- Continuous interaction between teachers and students through live classes and stored resources.
- Teachers receive data on student interactions to adjust teaching strategies.
- Students have efficient access to AI-generated resources, enhancing the overall learning experience.
- Government gets data of the students and the resources needed for their better learning experience,
- so that they could enhance the infrastructure in these remote areas.


## **METHODOLOGY TECH STACK**
![Methodology](https://github.com/user-attachments/assets/5d8b6772-f635-494e-803c-26dd02aec95d)

## **Technology Stack**
- **WEBAPP/WebSite**
- **Front-End:** Next.js,Flutter, Tailwind CSS for dynamic, responsive UIs.
- **Back-End:** Flask for scalable AI-driven backend.
- **AI/ML:** Whisper for speech-to-text, Azure Image Captioning, Mistral 7B for MCQs, Scikit Learn for ML, Gemini, LangChain, ChromaDB for RAGs and Resource Generation
- **Deployment:** Azure CDN, Docker for delivery and scaling; MongoDB Atlas for cloud based database; Azure Cloud App Services for hosting.




## (For low latency and low data consumption research details scroll down, we have a great innovation)


## OUR RESEARCH ON LOW LATENCY VIDEO STREAMING

![image](https://github.com/user-attachments/assets/b05952ec-310a-410e-bcbf-3fc51c4d6121)


**Optimized for Low Data Usage and Enhanced Remote Education**
# Comparison of Our Platform with Google Meet/Unacademy/Physicswallah/Microsoft Teams
---
## **How We Reduced Data Usage**

Our platform uniquely addresses data consumption issues, which is a major concern in remote education:


**1) Pre-Downloaded PowerPoint Slides:** (Consumption of data 40-50 mb per hour)
- To optimize data usage, our solution pre-downloads the PowerPoint slides and broadcasts only the slide number that changes.
- This approach significantly reduces the data required for streaming.
- The slide number update is communicated through **WebSocket**, ensuring that the React app synchronizes to the corresponding slide efficiently and **its streamed to all participants**
- Typical data usage is just 30-40 mb as slides switched are not too often and 10mb for ppt download
  
**2) Audio Streaming through WebRTC:** (Consumption of data 30-60 mb per hour)
- We use WebRTC for audio streaming, which ensures low latency and high-quality audio while minimizing data consumption.
  
**3) Jamboard Integration: (5-10 mb per hour)** 
- A streamlined version of Jamboard is included on the right side of the screen to assist teachers in explaining the content of the PowerPoint. This addition ensures that while the slides provide the primary content, the Jamboard supports interactive explanations.

- By focusing on these optimizations, we ensure that data usage remains minimal, with most streaming happening at low latency and with low data consumption.

---

## **Data Usage Comparison and Latency Comparison with existing platforms**

### **Google Meet**

| **Type**           | **Latency** | **Low Quality (360p)** | **Standard Quality (480p)** | **High Quality (720p)** | **HD Quality (1080p)** |
|--------------------|-------------|-------------------------|------------------------------|--------------------------|-------------------------|
| **Video + Audio**  | ~500 ms      |  1 GB per hour         | ~1 GB to 1.5 GB per hour     | ~1.5 GB to 2.5 GB per hour| ~2.5 GB to 4 GB per hour|

### **Our Platform ( Why we only considered websockets(for ppt state variable updation ) and webrtc ( for audio streaming)**

| **Technology**           | **Type**        | **Latency** | **Resolution** | **Data Usage (per hour)** |
|--------------------------|-----------------|-------------|----------------|---------------------------|
| **WebRTC Audio Only**    | Audio Only       | 100-300 ms   | N/A            | 30-60 MB                  |
| **WebSocket Audio Only** | Audio Only(Less reliable for audio) | 100-300 ms   | N/A            | 30-60 MB                  |
| **WebRTC Video + Audio** | Video & Audio    | 100-500 ms   | 720p/1080p     | 1.5-6 GB                  |
| **WebSocket Video + Audio** | Video & Audio | 100-500 ms   | 720p/1080p     | 1.5-6 GB                  |

## This is the reason we only considred audio of webrtc + updation of slides through websockets so that we could have ultimate version of low latency online education.

---

## **Technology Comparison why we chose webrtc and websockets**

| **Feature/Aspect**        | **FFmpeg**                              | **WebRTC**                                | **WebSocket**                           |
|---------------------------|-----------------------------------------|-------------------------------------------|----------------------------------------|
| **Primary Use**           | Media processing, encoding, decoding    | Real-time peer-to-peer communication      | Real-time client-server communication  |
| **Communication Type**    | Typically client-server                 | Peer-to-peer                              | Client-server                          |
| **Protocols Used**        | RTMP, RTP, HTTP, RTSP                    | UDP (primarily), TCP                      | TCP                                    |
| **Latency**               | Moderate to high                        | Low latency                               | Low latency                             |
| **Reliability**           | High for media processing               | Less reliable with UDP (packet loss), more with TCP | High reliability with TCP     |

---
## OUR PLAN IS DIVIDED INTO 2 PARTS AS I HAVE MENTIONED BEFORE


## **Plan Part 1 : Smartboard + Pre-Downloaded PPT + Audio (100MB)**

- **Overview:** Integrates WebSockets/WebRTC for audio streaming and pre-downloaded PowerPoint slides.
- **Components:**
  - **Audio Streaming:** WebSockets/WebRTC for low-latency audio.
  - **PPT Slides:** Pre-downloaded slides with updates broadcasted via WebSocket.
- **Implementation:** Students access audio and slides with minimal data usage. Changes in slides are efficiently communicated to the React app.
- **Bandwidth Usage:**
  - **Audio Only:** ~30 MB - 60 MB per hour.
  - **PPT:** Minimal impact (pre-downloaded).

## **Advantages**


1. **Optimized Data Usage:** Our platform reduces data consumption by pre-downloading PowerPoint slides and synchronizing slide changes via WebSocket. This minimizes the bandwidth impact of screen sharing.
2. **Efficient Content Delivery:** Leveraging WebRTC for audio streaming and a streamlined Jamboard integration ensures a low-bandwidth, high-quality educational experience.
3. **Low Bandwidth Requirements:** Designed for low-bandwidth environments, our platform provides a smooth educational experience even in remote areas.
4. **High-Quality Playback:** Azure CDN ensures smooth video playback and reduces buffering.


---
## **Plan part 2 : Enagement Enhancer Module(MOST DATA CONSUMPTION WILL ONLY BE IN RETRIEVAL OF RESOURCES FROM DATABASES which will be OVERALL MINIMAL)**
- SO After live stream teacher will upload the lecture where azure cdn and engagement enhancer module will come to play.

---
## **AI-Resource Generation: HOW WE ENSURE EFFICIENT AND LOW DATA CONSUMPTION**

- **AI Resources Are Generated Once and Stored:**
  - AI-generated resources (e.g., notes, quizzes, flowcharts) are created once during video upload.
  - Resources are stored in **Azure Blob Storage** and **MongoDB Atlas**, ensuring quick access without reprocessing.
  - This approach saves compute power and reduces data transfer costs.

- **Use of Lightweight APIs for Resource Generation:**
  - APIs such as **Groq API for LLaMA**, **Gemini API**, **Mistral 7B**, and **LangChain** are used for generating adaptive quizzes, notes, and diagrams.
  - These apis help to minimize memory and processing power consumption.

- **RAG (Retrieval-Augmented Generation) for Efficient AI Processing:**
  - RAG methods are applied to video transcriptions and captions to ensure high-accuracy resource generation.
  - This approach avoids unnecessary computation and reduces redundancy, streamlining the process.

- **Minimized Data Transfer for Engagement Enhancer Module:**
  - The **Engagement Enhancer Module** (quizzes, chatbots, visual aids) is designed for low data consumption.
  - Only small data packets, such as quiz responses or real-time visualizations retrieval from database, are transmitted, significantly reducing data usage compared to live-streamed alternatives.
 
- **AI-Generated Content Delivery via Azure CDN: WHY AZURE CDN YOU MAY ASK SEE BELOW**
  - All AI-generated content (videos, notes, visualizations) is delivered via **Azure CDN**.
  - This ensures low-latency content delivery and minimal bandwidth usage, even in low-internet environments.


## **Advantages**

## **Advantages of Azure CDN for Remote Education for downloading of video/playback of video and also for scalability**
![image](https://github.com/user-attachments/assets/25291503-26cd-418b-a743-5d0478009203)

- src: https://litebreeze.com/blog/2020/11/27/scaling-your-web-applications/

1. **Global Reach:** Efficient content delivery worldwide, including remote areas.
2. **Low Latency:** Reduces delays and buffering, providing smooth access to educational content.
3. **Scalability:** Supports large traffic volumes and spikes.
4. **High Availability:** Ensures reliable access to resources with minimal downtime.
5. **Cost Efficiency:** Lowers bandwidth and infrastructure costs.

## **Present Implementation**


![image](https://github.com/user-attachments/assets/19bfaaa8-015a-4bc0-941d-b9683f256696)
**Description of above image**: 
 - Quiz is generated  with adaptive difficulty and score at fixed duration of time all based on video content
 - This  is generated at fix interval of time so that student is always engaged.
![image](https://github.com/user-attachments/assets/53ac55df-daff-48dc-8953-37cc72b09954)

- **Description**: 
  - Summary of content in the video till now is shown so that student can revise it for the quiz wherever he left the video at
  - This also has a feedback module/ doubts module , as its remote learning directly  approaching teacher is not possible , they can reach out to teacher from here.
![Untitled design](https://github.com/user-attachments/assets/2b1d2d31-6cef-4286-816c-39100c04236f)

-**Description** :
  - Doubts assistant and feedback/doubt module in case something is not understood or some technical error occurs
  - Along with this there is also an **image visualization module** where we can see the images related to concepts taught in video being retrieved from databases( they are prestored and retrieved at specific interval they are mentioned at)
![image](https://github.com/user-attachments/assets/09edef28-b17f-4d67-99c7-2a17811b5261)

- **Description**: 
 - Engagement analytics of each student is generated like where the exact time where they get it wrong is marked in the line chart.
 - Accuracy of their answers are shown in pie chart
 - From this teachers can get insights on where student is lacking or which topic is not understood by student.

![image](https://github.com/user-attachments/assets/49dc95ad-256f-4b11-9235-8092b7d3a6a5)
- **Description**: 
 - This is the vocational learning module where the ai avatar would take student's test using speech
 - This module takes your tests in any language you are comfortable with.
 - Also analysis of your answers are shown just below, we are still working on making it more student friendly!.

## **NEXT IMPLEMENTATION**
Student Side dashboard:
![WhatsApp Image 2024-09-29 at 4 02 58 PM](https://github.com/user-attachments/assets/1c9185fd-b84c-489b-8834-8936fb1908e2)
- **Description:**
- This is where students can access their attendance, classes , also info about upcoming vocational tests 
- They can join live classes or see uploaded lectures, whatever they desire.

![WhatsApp Image 2024-09-29 at 4 14 12 PM](https://github.com/user-attachments/assets/479029b9-d314-491d-9146-685e43d8c278)
- **Description:**
- Here students have a list of videos.
- Students can view recordings of previous classes and join live classes.
- Student can see resources which Teachers have shared , like MindMaps and Notes which will be AI Generated.

**Teacher/Student side**

![WhatsApp Image 2024-09-29 at 4 13 17 PM](https://github.com/user-attachments/assets/d2e37f44-05f3-4aae-8d22-3dba12d07eb7)
- **Description of above image:**
- This is the live class view. Whiteboard and PPT can be viewed side by side.
- Teacher can explain points using PPT and draw diagrams, solve questions on the - whiteboard all which will be seen in real time over low latency networks
- This is also where images are visualized in chat, where all are retrieved at specific time intervals from databases/blob storage, all based on video content.

**Teacher Side**
![WhatsApp Image 2024-09-29 at 4 03 28 PM](https://github.com/user-attachments/assets/2ca3f56e-00cb-4558-a59a-6e86b886f7fa)
- **DESCRIPTION OF ABOVE IMAGE**
- This is the teacher dashboard. 
- Teacher can schedule tests, classes and upload resources here. Additionally, they can conduct classes using pre-attached PPTs and draw on whiteboard. 

![WhatsApp Image 2024-09-29 at 4 04 19 PM](https://github.com/user-attachments/assets/cbfc2ab3-3edd-4bbf-982f-e6d739c3d2c3)
- **DESCRIPTION OF ABOVE IMAGE**
- Teachers will also be able to see students who are not able to engage in class and thus give attention to weaker students
- Count of engagement analytics as well as doubts solved is also shown here
- Engagement will be counted at each interval of time so that we can make sure that teacher is also getting appropriate feedback about their teachings.



### **Previous Methodology(OUR TRIAL AND ERROR/Research )**

- Previously, NLP-based methods were used for question generation, but they were resource-intensive and less accurate. 
- We transitioned to advanced LLMs like LLAMA and Gemini for better performance.
- We have gone from T5, to BERT to Mistral7B to Groq LLAMA and Gemini.
- So entire process of research has been done to get the best mcqs
## Questions model
![questionsmodel](https://github.com/user-attachments/assets/d78be147-b92e-44e2-9533-648f8a58f121)

Present Models how they generate content(all Rag based)
### Flow diagram and Image Generation module[RAGs based]

![FLOWFLOW](https://github.com/user-attachments/assets/ac51465c-f38a-4cb9-b247-ab03fce91b30)

## Notes Generation Module[RAGs based]
![classnotesmodel](https://github.com/user-attachments/assets/6b72af0b-fc0d-41dd-be66-d118073d2311)


## **DEPENDENCIES**
- **Cost Management:** Ensuring that the cost for the platform remains manageable. Most materials like MCQs, images, and notes are generated once and stored in Azure Blob and MongoDB Atlas while videos are uploading.
- **Scalability:** Ensuring that databases are deployed on the cloud to balance user load and maintain system scalability.


## **BUSINESS RELEVANCE**
![image](https://github.com/user-attachments/assets/659db129-965b-44e6-b51c-e06a56b58cd0)

**Cost Effectiveness ALL RESOURCES ARE GENERATED ONLY ONCE WHEN VIDEO IS UPLOADED TO SAVE COSTS**:
  
- **AI-Generated Resources:** Created once and stored in Azure Blob Storage and MongoDB Atlas, reducing repeated generation costs and optimizing resource usage.



## **Impact And Benefits**
![image](https://github.com/user-attachments/assets/6d2d8250-3901-460e-aa06-7bc563f54561)



## **DEMO VIDEO**


(Watch the demo video on 2X speed if you prefer it.)
- **Demo Video:** [Watch the demo video](https://youtu.be/2MAV9zW43QE)
- **Please do see the present implementation and future implementation ui/frontend first as it would give a clue on what we are working on, in this video we only have  poc of the low latency/low data live streaming solution and also generation of ai resources,  whose ui/frontend would be improved by 10x till finale.**
[![Watch the demo video]![thumbnail](![image](https://github.com/user-attachments/assets/4970c42a-d863-4923-a299-35eb443f69a0)
()](https://youtu.be/2MAV9zW43QE)

## **PPT LINK: Edu-connect Prototype**
- [View and Download the PPT Presentation](https://docs.google.com/presentation/d/1lS-D2Hg082QVSKBqYwQ98Jx9Z66FGlRJdlipw_SRnlE/edit#slide=id.g302193ce8f2_0_820)
  
## **FeedbackForm**
- We really appreciate the opportunity given to us by Ministry of Education and are looking forward to implement this solution , please do give feedback about our project as it would help us a lot to make future improvements
- Thank you really much again for taking time to fill up the form!
- https://docs.google.com/forms/d/e/1FAIpQLSf-Ck4gRUHMlhzhKE3YIHNhV-6UysEqrPVXp4vzBKcCXd2jPw/viewform

## RESEARCH REFERENCES:
https://medium.com/@digital_samba/a-comparison-of-webrtc-vs-websocket-07e5343871b4
https://stribny.name/blog/2020/07/real-time-data-streaming-using-fastapi-and-websockets/
https://stackoverflow.com/questions/61100602/ffmpeg-to-webrtc-via-udp-and-datachannel-for-low-latency-screenshare
https://dolby.io/blog/the-complete-guide-to-low-latency-in-live-streaming/
https://ieeexplore.ieee.org/document/9522198
https://docs.google.com/document/d/1k78TigEAXfy9MlDWL4xvCRBdZ6BuXjUK4Nzz6nxlHIs/edit
https://www.researchgate.net/publication/373045881_Impact_of_Online_Learning_on_Student_Engagement_and_Academic_Performance
https://www.unicef.org/rosa/sites/unicef.org.rosa/files/2020-06/Media%20Fact%20Sheet%3A%20Unequal%20access%20to%20remote%20schooling.pdf
https://www.researchgate.net/publication/376456861_ANALYZING_THE_IMPACT_OF_STUDENT_ENGAGEMENT_ON_LEARNING_OUTCOMES_IN_E-LEARNING_PLATFORMS_A_SYSTEMATIC_REVIEW_OF_LITRETURE
https://educationaltechnologyjournal.springeropen.com/articles/10.1186/s41239-021-00270-1
https://link.springer.com/article/10.1007/s10758-023-09704-3
https://www.sciencedirect.com/science/article/pii/S2590291124000676
https://journals.sagepub.com/doi/full/10.1177/2042753019882567
https://www.researchgate.net/publication/384067695_Impact_of_Technology-Enhanced_Learning_on_Student_Outcomes
https://docs.google.com/document/d/14re6fryT5AbtQjucr57YsmUxMyIjwWaGiusrRAzYcGs/edit?addon_store







