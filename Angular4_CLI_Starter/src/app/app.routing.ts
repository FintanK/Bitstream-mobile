///<reference path="dashboard/vr/vr.component.ts"/>
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import {CallsComponent} from "./dashboard/calls/calls.component";
import {CameraComponent} from "./dashboard/camera/camera.component";
import {ChatComponent} from "./dashboard/chat/chat.component";
import {ContactsComponent} from "./dashboard/contacts/contacts.component";
import {MusicComponent} from "./dashboard/music/music.component";
import {SettingsComponent} from "./dashboard/settings/settings.component";
import {TorrentsComponent} from "./dashboard/torrents/torrents.component";
import {VideoComponent} from "./dashboard/video/video.component";
import {WalletComponent} from "./dashboard/wallet/wallet.component";
import {PhotosComponent} from "./dashboard/photos/photos.component";
import {StorageComponent} from "./dashboard/storage/storage.component";
import {HomeComponent} from "./dashboard/files/ipfs-file-explorer/home/home.component";
import {VrComponent} from "./dashboard/vr/vr.component";
import {NetworkComponent} from "./dashboard/network/network.component";
import {LoginComponent} from "./dashboard/login/login.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'BitStream'
    }
  },
  {
    path: 'files',
    component: HomeComponent,
    data: {
      title: 'Files'
    }
  },
  {
    path: 'network',
    component: NetworkComponent,
    data: {
      title: 'Networking'
    }
  },
  {
    path: 'photos',
    component: PhotosComponent,
    data: {
      title: 'Photos'
    }
  },
  {
    path: 'storage',
    component: StorageComponent,
    data: {
      title: 'Downloads'
    }
  },
  {
    path: 'calls',
    component: ChatComponent,
    data: {
      title: 'Files'
    }
  },
  {
    path: 'camera',
    component: CameraComponent,
    data: {
      title: 'Camera'
    }
  },
  {
    path: 'chat',
    component: ChatComponent,
    data: {
      title: 'Chat'
    }
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    data: {
      title: 'Contacts'
    }
  },
  {
    path: 'vr',
    component: VrComponent,
    data: {
      title: 'VR'
    }
  },
  {
    path: 'music',
    component: MusicComponent,
    data: {
      title: 'Music'
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: 'Files'
    }
  },  {
    path: 'torrents',
    component: TorrentsComponent,
    data: {
      title: 'Files'
    }
  },  {
    path: 'video',
    component: VideoComponent,
    data: {
      title: 'Files'
    }
  }, {
    path: 'wallet',
    component: WalletComponent,
    data: {
      title: 'Token Wallet'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
