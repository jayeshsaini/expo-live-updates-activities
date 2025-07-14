package expo.modules.liveupdates

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.liveupdates.LiveUpdatesNotificationManager.BigTextConfig
import expo.modules.liveupdates.LiveUpdatesNotificationManager.CallConfig
import expo.modules.liveupdates.LiveUpdatesNotificationManager.PointConfig
import expo.modules.liveupdates.LiveUpdatesNotificationManager.ProgressConfig
import expo.modules.liveupdates.LiveUpdatesNotificationManager.SegmentConfig
import expo.modules.liveupdates.LiveUpdatesNotificationManager.StandardConfig

class ExpoLiveUpdatesActivitiesModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoLiveUpdatesActivities")

    Function("showStandardLiveUpdate") { params: Map<String, Any> ->
      val context = appContext.reactContext ?: return@Function

      val getDrawableId = { resourceName: String? ->
        resourceName?.let {
          context.resources.getIdentifier(it, "drawable", context.packageName).let { id ->
            if (id != 0) id else null
          }
        }
      }

      val config =
              StandardConfig(
                      title = params["title"] as? String ?: "Standard Live Update",
                      text = params["text"] as? String
                                      ?: "This is a standard ongoing notification.",
                      smallIcon = getDrawableId(params["smallIcon"] as? String),
                      autoCancel = params["autoCancel"] as? Boolean ?: true,
                      ongoing = params["ongoing"] as? Boolean ?: true
              )

      LiveUpdatesNotificationManager.showStandardLiveUpdate(context, config)
    }

    Function("showBigTextLiveUpdate") { params: Map<String, Any> ->
      val context = appContext.reactContext ?: return@Function

      val getDrawableId = { resourceName: String? ->
        resourceName?.let {
          context.resources.getIdentifier(it, "drawable", context.packageName).let { id ->
            if (id != 0) id else null
          }
        }
      }

      val config =
              BigTextConfig(
                      title = params["title"] as? String ?: "BigText Live Update",
                      text = params["text"] as? String ?: "Tap to see more details.",
                      bigText = params["bigText"] as? String
                                      ?: "This is a Live Update notification with BigTextStyle. It can show more details about the ongoing activity.",
                      smallIcon = getDrawableId(params["smallIcon"] as? String),
                      autoCancel = params["autoCancel"] as? Boolean ?: true,
                      ongoing = params["ongoing"] as? Boolean ?: true
              )

      LiveUpdatesNotificationManager.showBigTextLiveUpdate(context, config)
    }

    Function("showCallLiveUpdate") { params: Map<String, Any> ->
      val context = appContext.reactContext ?: return@Function

      val getDrawableId = { resourceName: String? ->
        resourceName?.let {
          context.resources.getIdentifier(it, "drawable", context.packageName).let { id ->
            if (id != 0) id else null
          }
        }
      }

      val config =
              CallConfig(
                      title = params["title"] as? String ?: "Call Live Update",
                      text = params["text"] as? String ?: "Ongoing call with Contact Name",
                      callerName = params["callerName"] as? String ?: "Contact Name",
                      smallIcon = getDrawableId(params["smallIcon"] as? String),
                      callerIcon = getDrawableId(params["callerIcon"] as? String),
                      isVideo = params["isVideo"] as? Boolean ?: false,
                      autoCancel = params["autoCancel"] as? Boolean ?: true,
                      ongoing = params["ongoing"] as? Boolean ?: true
              )

      LiveUpdatesNotificationManager.showCallLiveUpdate(context, config)
    }

    Function("showProgressLiveUpdate") { params: Map<String, Any> ->
      val context = appContext.reactContext ?: return@Function

      val getDrawableId = { resourceName: String? ->
        resourceName?.let {
          context.resources.getIdentifier(it, "drawable", context.packageName).let { id ->
            if (id != 0) id else null
          }
        }
      }

      val config =
              ProgressConfig(
                      progress = (params["progress"] as? Double)?.toInt() ?: 0,
                      title = params["title"] as? String ?: "Progress Update",
                      text = params["text"] as? String ?: "In progress...",
                      styledByProgress = params["styledByProgress"] as? Boolean ?: true,
                      isIndeterminate = params["isIndeterminate"] as? Boolean ?: false,
                      autoCancel = params["autoCancel"] as? Boolean ?: true,
                      ongoing = params["ongoing"] as? Boolean ?: true,
                      smallIcon = getDrawableId(params["smallIcon"] as? String),
                      trackerIcon = getDrawableId(params["trackerIcon"] as? String),
                      startIcon = getDrawableId(params["startIcon"] as? String),
                      endIcon = getDrawableId(params["endIcon"] as? String),
                      segments =
                              (params["segments"] as? List<Map<String, Any>>)?.map {
                                SegmentConfig(
                                        length = (it["length"] as Double).toInt(),
                                        color = (it["color"] as Double).toLong().toInt()
                                )
                              }
                                      ?: emptyList(),
                      points =
                              (params["points"] as? List<Map<String, Any>>)?.map {
                                PointConfig(
                                        position = (it["position"] as Double).toInt(),
                                        color = (it["color"] as Double).toLong().toInt()
                                )
                              }
                                      ?: emptyList()
              )

      LiveUpdatesNotificationManager.showProgressLiveUpdate(context, config)
    }

    Function("cancelLiveUpdate") {
      val context = appContext.reactContext ?: return@Function null
      LiveUpdatesNotificationManager.cancel(context)
      null
    }
  }
}
