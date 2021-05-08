const keyAvatar = 'a-avatar';
const keySidebar = '_key_sidebar';
export class LocalStorageUtil {
    /**
     * Get Avatar Url from localstorage
     * @returns
     */
    static getAvatar() {
        const avatarUrl = localStorage.getItem(keyAvatar);
        if (!avatarUrl) {
            return;
        }
        return avatarUrl;
    }

    /**
     * Set Avatar Url to localstorage
     * @param url
     */
    static setAvatar(url: string) {
        localStorage.setItem(keyAvatar, url);
    }

    /**
     * Get state sidebar
     */
    static getStateSidebar() {
        const state = localStorage.getItem(keySidebar);
        if (!state) {
            return true;
        }
        // tslint:disable-next-line:triple-equals
        return state == 'true';
    }

    /**
     * Set state sidebar
     * @param state
     */
    static setStateSidebar(state: boolean) {
        localStorage.setItem(keySidebar, state.toString());
    }
}
