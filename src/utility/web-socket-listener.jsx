import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export function registerWebSocket(registrations) {
    const socket = SockJS("/demo");
    const stompClient = Stomp.over(socket);
    stompClient.connect({},function () {
        registrations.forEach(function (registration) {
            stompClient.subscribe(registration.route, registration.callback)
        })
    })

}