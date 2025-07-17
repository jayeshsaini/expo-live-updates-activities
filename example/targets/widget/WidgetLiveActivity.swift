import ActivityKit
import WidgetKit
import SwiftUI

struct WidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var data: WidgetData
    }

    // Fixed non-changing properties about your activity go here!
    var data: WidgetData
}

struct WidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: WidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text(context.attributes.data.title)
                Text(context.state.data.subtitle)
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text(context.attributes.data.title)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text(context.state.data.subtitle)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text(context.state.data.description)
                    // more content
                }
            } compactLeading: {
                Text(context.attributes.data.title)
            } compactTrailing: {
                Text(context.state.data.subtitle)
            } minimal: {
                Text(context.state.data.subtitle)
            }
            .widgetURL(URL(string: "https://www.expo.dev"))
            .keylineTint(Color.red)
        }
    }
}

extension WidgetAttributes {
    fileprivate static var preview: WidgetAttributes {
        WidgetAttributes(data: WidgetData(title: "Title", subtitle: "Subtitle", description: "Description"))
    }
}

extension WidgetAttributes.ContentState {
    fileprivate static var smiley: WidgetAttributes.ContentState {
        WidgetAttributes.ContentState(data: WidgetData(title: "Title", subtitle: "Subtitle", description: "Description"))
     }
     
     fileprivate static var starEyes: WidgetAttributes.ContentState {
         WidgetAttributes.ContentState(data: WidgetData(title: "Title", subtitle: "Subtitle", description: "Description"))
     }
}

#Preview("Notification", as: .content, using: WidgetAttributes.preview) {
   WidgetLiveActivity()
} contentStates: {
    WidgetAttributes.ContentState.smiley
    WidgetAttributes.ContentState.starEyes
}
