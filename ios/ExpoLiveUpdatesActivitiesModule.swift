import ExpoModulesCore
import ActivityKit

// MUST exactly match the WidgetAttributes struct in WidgetLiveActivity.
struct WidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var data: WidgetData
    }
    
    // Fixed non-changing properties about your activity go here!
    var data: WidgetData
}

struct WidgetData: Codable, Hashable {
    var title: String
    var subtitle: String
    var description: String
}

public class ExpoLiveUpdatesActivitiesModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('ExpoLiveUpdatesActivities')` in JavaScript.
        Name("ExpoLiveUpdatesActivities")
        
        Events("onLiveActivityCancel")
        
        Function("areActivitiesEnabled") { () -> Bool in
            if #available(iOS 16.2, *) {
                return ActivityAuthorizationInfo().areActivitiesEnabled
            } else {
                return false
            }
        }
        
        Function("isActivityInProgress") { () -> Bool in
            if #available(iOS 16.2, *) {
                return !Activity<WidgetAttributes>.activities.isEmpty
            } else {
                return false
            }
        }
        
        Function("startActivity") { (data: String) -> Bool in
            if #available(iOS 16.2, *) {
                do {
                    let widgetData = try JSONDecoder().decode(WidgetData.self, from: data.data(using: .utf8)!)
                    
                    let attributes = WidgetAttributes(data: widgetData)
                    let contentState = WidgetAttributes.ContentState(data: widgetData)
                    let activityContent = ActivityContent(state: contentState, staleDate: nil)
                    
                    let activity = try Activity.request(attributes: attributes, content: activityContent)
                    NotificationCenter.default.addObserver(self, selector: #selector(self.onLiveActivityCancel), name: Notification.Name("onLiveActivityCancel"), object: nil)
                    return true
                } catch {
                    return false
                }
            } else {
                return false
            }
        }
        
        Function("updateActivity") { (data: String) -> Void in
            if #available(iOS 16.2, *) {
                do {
                    let widgetData = try JSONDecoder().decode(WidgetData.self, from: data.data(using: .utf8)!)
                    let contentState = WidgetAttributes.ContentState(data: widgetData)
                    
                    Task {
                        for activity in Activity<WidgetAttributes>.activities {
                            await activity.update(using: contentState)
                        }
                    }
                } catch {
                    // Handle error
                }
            }
        }
        
        Function("endActivity") { (data: String, dismissalPolicyString: String) -> Void in
            if #available(iOS 16.2, *) {
                DispatchQueue.main.async {
                    Task {
                        do {
                            let widgetData = try JSONDecoder().decode(WidgetData.self, from: data.data(using: .utf8)!)
                            let contentState = WidgetAttributes.ContentState(data: widgetData)
                            let finalContent = ActivityContent(state: contentState, staleDate: nil)
                            
                            let dismissalPolicy: ActivityUIDismissalPolicy
                            switch dismissalPolicyString {
                            case "immediate":
                                dismissalPolicy = .immediate
                            case "after":
                                dismissalPolicy = .after(.now + 5) // 5 seconds
                            default:
                                dismissalPolicy = .default
                            }
                            
                            for activity in Activity<WidgetAttributes>.activities {
                                await activity.end(finalContent, dismissalPolicy: dismissalPolicy)
                            }
                            
                            NotificationCenter.default.removeObserver(self, name: Notification.Name("onLiveActivityCancel"), object: nil)
                        } catch {
                            // Handle error
                        }
                    }
                }
            }
        }
    }
    
    @objc
    func onLiveActivityCancel() {
        sendEvent("onLiveActivityCancel", [:])
    }
}
