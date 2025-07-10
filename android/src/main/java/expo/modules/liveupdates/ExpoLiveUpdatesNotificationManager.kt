package expo.modules.liveupdates

import android.Manifest
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Context.NOTIFICATION_SERVICE
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

    fun showLiveUpdateNotification(context: Context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationManager = context.getSystemService(NOTIFICATION_SERVICE) as NotificationManager
            val channel = NotificationChannel(CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_DEFAULT)
            channel.description = CHANNEL_DESCRIPTION
            notificationManager.createNotificationChannel(channel)
        }

        val notification = if (Build.VERSION.SDK_INT >= 34) {
            val progressStyle = Notification.ProgressStyle().apply {
                setStyledByProgress(false)
                setProgress(55)
                setProgressTrackerIcon(
                    Icon.createWithResource(context, android.R.drawable.ic_dialog_info)
                )
                setProgressSegments(
                    listOf(
                        Notification.ProgressStyle.Segment(33).setColor(0xFF03DAC5.toInt()),
                        Notification.ProgressStyle.Segment(33).setColor(0xFFBB86FC.toInt()),
                        Notification.ProgressStyle.Segment(33).setColor(0xFF3700B3.toInt()),
                        Notification.ProgressStyle.Segment(33).setColor(0xFF018786.toInt())
                    )
                )
                setProgressPoints(
                    listOf(
                        Notification.ProgressStyle.Point(33).setColor(0xFF00FF00.toInt()),
                        Notification.ProgressStyle.Point(66).setColor(0xFF00FF00.toInt()),
                        Notification.ProgressStyle.Point(99).setColor(0xFF00FF00.toInt())
                    )
                )
            }
            Notification.Builder(context, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .setContentTitle("Live Update")
                .setContentText("This is a live update notification.")
                .setAutoCancel(true)
                .setStyle(progressStyle)
                .build()
        } else {
            androidx.core.app.NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .setContentTitle("Live Update")
                .setContentText("This is a live update notification.")
                .setAutoCancel(true)
                .setProgress(100, 55, false)
                .build()
        }

        with(NotificationManagerCompat.from(context)) {
            if (ActivityCompat.checkSelfPermission(
                    context,
                    Manifest.permission.POST_NOTIFICATIONS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                return
            }
            notify(NOTIFICATION_ID, notification)
        }
    }
}