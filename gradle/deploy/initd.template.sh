#!/bin/sh
#
### BEGIN INIT INFO
# Provides:          @@projectName@@
# Required-Start:    $local_fs $remote_fs $network $syslog
# Required-Stop:     $local_fs $remote_fs $network $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: WPAF-@@projectName@@
# Description: Service script for WPAF @@projectName@@ application
### END INIT INFO
DESC='WPAF'
PROJ_HOME=@@installationDir@@/@@projectName@@
export JAVA_HOME=/opt/jdk1.8.0_45
WPAF_USER=@@user@@
CURRENT_USER=$(whoami)

case "$1" in
 start)
       echo -n "Starting $DESC"
       cd $PROJ_HOME
       rm -f $PROJ_HOME/server.pid
       if [ "$WPAF_USER" = "$CURRENT_USER" ]
       then
               nohup $PROJ_HOME/bin/@@projectName@@ --spring.profiles.active=staging,staging-secret > $PROJ_HOME/console.log &
               sleep 5 
               echo $(pgrep -f "java.*@@projectName@@")  > $PROJ_HOME/server.pid
       else
               su -s /bin/sh -c 'exec "$0" "$@" ' $WPAF_USER -- nohup $PROJ_HOME/bin/@@projectName@@ --spring.profiles.active=staging,staging-secret > $PROJ_HOME/console.log &
               su -s /bin/sh -c 'exec "$0" "$@" ' $WPAF_USER -- echo $(pgrep -f "java.*@@projectName@@")  > $PROJ_HOME/server.pid
       fi
       echo "."
       ;;
 stop)
       echo -n "Stopping $DESC"
       if [ "$WPAF_USER" = "$CURRENT_USER" ]
       then
               kill $(cat $PROJ_HOME/server.pid)
       else
               su -s /bin/sh -c 'exec "$0" "$@" > /dev/null' $WPAF_USER -- kill $(cat $PROJ_HOME/server.pid)
       fi
       rm -f $PROJ_HOME/server.pid
       echo "."
       ;;
 restart)
       echo -n "Restarting $DESC not implemented please use start stop"
       ;;
 *)
       echo "Usage: service @@projectName@@ {start|stop|restart}"
       exit 1
esac
exit 0
