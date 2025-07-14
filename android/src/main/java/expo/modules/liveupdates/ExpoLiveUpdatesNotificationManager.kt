package expo.modules.liveupdates

import android.Manifest
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Person
import android.content.Context
import android.content.Context.NOTIFICATION_SERVICE
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.drawable.Icon
import android.os.Build
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationManagerCompat

object LiveUpdatesNotificationManager {
  private const val CHANNEL_ID = "live_updates_channel"
  private const val CHANNEL_NAME = "Live Updates"
  private const val CHANNEL_DESCRIPTION = "Live Updates Channel"
  private const val NOTIFICATION_ID = 1234

  // Data classes for configuration
  data class StandardConfig(
          val title: String = "Standard Live Update",
          val text: String = "This is a standard ongoing notification.",
          val smallIcon: Int? = null,
          val autoCancel: Boolean = true,
          val ongoing: Boolean = true
  )

  data class BigTextConfig(
          val title: String = "BigText Live Update",
          val text: String = "Tap to see more details.",
          val bigText: String =
                  "This is a Live Update notification with BigTextStyle. It can show more details about the ongoing activity.",
          val smallIcon: Int? = null,
          val autoCancel: Boolean = true,
          val ongoing: Boolean = true
  )

  data class CallConfig(
          val title: String = "Call Live Update",
          val text: String = "Ongoing call with Contact Name",
          val callerName: String = "Contact Name",
          val smallIcon: Int? = null,
          val callerIcon: Int? = null,
          val isVideo: Boolean = false,
          val autoCancel: Boolean = true,
          val ongoing: Boolean = true
  )

  data class ProgressConfig(
          val progress: Int = 0,
          val title: String = "Progress Update",
          val text: String = "In progress...",
          val smallIcon: Int? = null,
          val trackerIcon: Int? = null,
          val startIcon: Int? = null,
          val endIcon: Int? = null,
          val segments: List<SegmentConfig> = emptyList(),
          val points: List<PointConfig> = emptyList(),
          val styledByProgress: Boolean = true,
          val isIndeterminate: Boolean = false,
          val autoCancel: Boolean = true,
          val ongoing: Boolean = true
  )

  data class SegmentConfig(val length: Int, val color: Int)

  data class PointConfig(val position: Int, val color: Int)

  private fun notifyIfPermitted(context: Context, notification: Notification) {
    with(NotificationManagerCompat.from(context)) {
      if (ActivityCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) !=
                      PackageManager.PERMISSION_GRANTED
      ) {
        return
      }
      notify(NOTIFICATION_ID, notification)
    }
  }

  fun showProgressLiveUpdate(context: Context, config: ProgressConfig) {
    createChannel(context)
    val notification =
            if (Build.VERSION.SDK_INT >= 34) {
              val progressStyle =
                      Notification.ProgressStyle().apply {
                        // Basic settings
                        setStyledByProgress(config.styledByProgress)
                        setProgress(config.progress)
                        setProgressIndeterminate(config.isIndeterminate)

                        // Icons - Create Icon objects from resource IDs
                        config.trackerIcon?.let {
                          setProgressTrackerIcon(Icon.createWithResource(context, it))
                        }
                        config.startIcon?.let {
                          setProgressStartIcon(Icon.createWithResource(context, it))
                        }
                        config.endIcon?.let {
                          setProgressEndIcon(Icon.createWithResource(context, it))
                        }

                        // Segments
                        if (config.segments.isNotEmpty()) {
                          setProgressSegments(
                                  config.segments.map { segment ->
                                    Notification.ProgressStyle.Segment(segment.length).apply {
                                      setColor(segment.color)
                                    }
                                  }
                          )
                        }

                        // Points
                        if (config.points.isNotEmpty()) {
                          setProgressPoints(
                                  config.points.map { point ->
                                    Notification.ProgressStyle.Point(point.position).apply {
                                      setColor(point.color)
                                    }
                                  }
                          )
                        }
                      }

              Notification.Builder(context, CHANNEL_ID)
                      .setSmallIcon(config.smallIcon ?: android.R.drawable.ic_dialog_info)
                      .setContentTitle(config.title)
                      .setContentText(config.text)
                      .setAutoCancel(config.autoCancel)
                      .setOngoing(config.ongoing)
                      .setStyle(progressStyle)
                      .build()
            } else {
              // Fallback for older versions
              androidx.core.app.NotificationCompat.Builder(context, CHANNEL_ID)
                      .setSmallIcon(config.smallIcon ?: android.R.drawable.ic_dialog_info)
                      .setContentTitle(config.title)
                      .setContentText(config.text)
                      .setAutoCancel(config.autoCancel)
                      .setOngoing(config.ongoing)
                      .setProgress(100, config.progress, config.isIndeterminate)
                      .build()
            }
    notifyIfPermitted(context, notification)
  }

  fun showStandardLiveUpdate(context: Context, config: StandardConfig) {
    createChannel(context)
    val notification =
            Notification.Builder(context, CHANNEL_ID)
                    .setSmallIcon(config.smallIcon ?: android.R.drawable.ic_dialog_info)
                    .setContentTitle(config.title)
                    .setContentText(config.text)
                    .setAutoCancel(config.autoCancel)
                    .setOngoing(config.ongoing)
                    .build()
    notifyIfPermitted(context, notification)
  }

  fun showBigTextLiveUpdate(context: Context, config: BigTextConfig) {
    createChannel(context)
    val bigTextStyle = Notification.BigTextStyle().bigText(config.bigText)
    val notification =
            Notification.Builder(context, CHANNEL_ID)
                    .setSmallIcon(config.smallIcon ?: android.R.drawable.ic_dialog_info)
                    .setContentTitle(config.title)
                    .setContentText(config.text)
                    .setAutoCancel(config.autoCancel)
                    .setOngoing(config.ongoing)
                    .setStyle(bigTextStyle)
                    .build()
    notifyIfPermitted(context, notification)
  }

  fun showCallLiveUpdate(context: Context, config: CallConfig) {
    createChannel(context)

    if (Build.VERSION.SDK_INT >= 31) {
      val callChannel =
              NotificationChannel("call_channel", "Calls", NotificationManager.IMPORTANCE_HIGH)
                      .apply {
                        enableLights(true)
                        enableVibration(true)
                      }
      val notificationManager =
              context.getSystemService(NOTIFICATION_SERVICE) as NotificationManager
      notificationManager.createNotificationChannel(callChannel)

      val caller =
              Person.Builder()
                      .setName(config.callerName)
                      .setIcon(
                              config.callerIcon?.let { Icon.createWithResource(context, it) }
                                      ?: Icon.createWithResource(
                                              context,
                                              android.R.drawable.sym_call_outgoing
                                      )
                      )
                      .build()

      val hangUpIntent =
              PendingIntent.getActivity(
                      context,
                      0,
                      Intent(Intent.ACTION_VIEW),
                      PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
              )

      val fullScreenIntent =
              PendingIntent.getActivity(
                      context,
                      0,
                      context.packageManager.getLaunchIntentForPackage(context.packageName),
                      PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
              )

      val callStyle =
              Notification.CallStyle.forOngoingCall(caller, hangUpIntent).setIsVideo(config.isVideo)

      val notification =
              Notification.Builder(context, "call_channel")
                      .setSmallIcon(config.smallIcon ?: android.R.drawable.sym_call_outgoing)
                      .setContentTitle(config.title)
                      .setContentText(config.text)
                      .setCategory(Notification.CATEGORY_CALL)
                      .setPriority(Notification.PRIORITY_HIGH)
                      .setAutoCancel(config.autoCancel)
                      .setOngoing(config.ongoing)
                      .setStyle(callStyle)
                      .setFullScreenIntent(fullScreenIntent, true)
                      .build()

      notifyIfPermitted(context, notification)
    } else {
      val notification =
              Notification.Builder(context, CHANNEL_ID)
                      .setSmallIcon(config.smallIcon ?: android.R.drawable.sym_call_outgoing)
                      .setContentTitle(config.title)
                      .setContentText(config.text)
                      .setAutoCancel(config.autoCancel)
                      .setOngoing(config.ongoing)
                      .build()
      notifyIfPermitted(context, notification)
    }
  }

  private fun createChannel(context: Context) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val notificationManager =
              context.getSystemService(NOTIFICATION_SERVICE) as NotificationManager
      val channel =
              NotificationChannel(CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_DEFAULT)
      channel.description = CHANNEL_DESCRIPTION
      notificationManager.createNotificationChannel(channel)
    }
  }

  fun cancel(context: Context) {
    val notificationManager = context.getSystemService(NOTIFICATION_SERVICE) as NotificationManager
    notificationManager.cancel(NOTIFICATION_ID)
  }
}
