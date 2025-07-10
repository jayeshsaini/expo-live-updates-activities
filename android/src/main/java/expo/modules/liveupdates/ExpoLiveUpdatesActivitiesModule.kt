package expo.modules.liveupdates

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class ExpoLiveUpdatesActivitiesModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoLiveUpdatesActivities")

    Function("showLiveUpdateNotification") {
      val context = appContext.reactContext ?: return@Function null
      LiveUpdatesNotificationManager.showLiveUpdateNotification(context)
      null
    }

//    Function("showLiveUpdate") { progress: Int, title: String, text: String ->
//      val context = appContext.reactContext ?: return@Function
//      LiveUpdatesNotificationManager.showProgressNotification(context, progress, title, text)
//    }
//
//    Function("completeLiveUpdate") { title: String, text: String ->
//      val context = appContext.reactContext ?: return@Function
//      LiveUpdatesNotificationManager.completeNotification(context, title, text)
//    }
//
//    Function("cancelLiveUpdate") {
//      val context = appContext.reactContext ?: return@Function null
//      LiveUpdatesNotificationManager.cancel(context)
//      null
//    }
  }
}
