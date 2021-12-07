//
//  NotificationService.swift
//  NotificationServiceExtension
//
//  Created by Anurag on 26/07/21.
//

import UserNotifications

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void)
     {
       self.contentHandler = contentHandler
       bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
       // Modify the notification content here...
       if let bestAttemptContent = bestAttemptContent {
         //Get attachment URL from JSON Payload
         if let urlString = bestAttemptContent.userInfo["attachment-url"] as? String,
           let data = NSData(contentsOf: URL(string:urlString)!) as Data? {
           let path = NSTemporaryDirectory() + "attachment"
           _ = FileManager.default.createFile(atPath: path, contents: data, attributes: nil)
           //Save into temporary Storage
           do {
             let file = URL(fileURLWithPath: path)
             let attachment = try UNNotificationAttachment(identifier: "attachment", url: file,options:[UNNotificationAttachmentOptionsTypeHintKey : "public.jpeg"])
             
             bestAttemptContent.attachments = [attachment]
             
           } catch {
             print(error)
             
           }
         }
         contentHandler(bestAttemptContent)
       }
       
     }
    
    override func serviceExtensionTimeWillExpire() {
        // Called just before the extension will be terminated by the system.
        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }

}
