// spellkaster cli
const skcli = {}
skcli.tPanelOpen = false
skcli.bPanelOpen = false
skcli.lPanelOpen = false
skcli.rPanelOpen = false
skcli.aPanelOpen = false
skcli.togglePanel = function (p) {
    switch (p) {
        case 't':
            console.log('top');
            if (skcli.tPanelOpen) {
                // close panel
                document.querySelector('.sk-cli__top').classList.remove('sk-cli__top--expanded')
                document.querySelector('.sk-cli__top').classList.add('sk-cli__top--collapsed')
                skcli.tPanelOpen = false
                console.log('top expanded')
            } else {
                // open panel
                document.querySelector('.sk-cli__top').classList.remove('sk-cli__top--collapsed')
                document.querySelector('.sk-cli__top').classList.add('sk-cli__top--expanded')
                skcli.tPanelOpen = true
                console.log('top collapsed')
            }
            break;
        case 'b':
            console.log('bottom');
            if (skcli.bPanelOpen) {
                // close panel
                document.querySelector('.sk-cli__bottom').classList.remove('sk-cli__bottom--expanded')
                document.querySelector('.sk-cli__bottom').classList.add('sk-cli__bottom--collapsed')
                skcli.bPanelOpen = false
                console.log('bottom expanded')
            } else {
                // open panel
                document.querySelector('.sk-cli__bottom').classList.remove('sk-cli__bottom--collapsed')
                document.querySelector('.sk-cli__bottom').classList.add('sk-cli__bottom--expanded')
                skcli.bPanelOpen = true
                console.log('bottom collapsed')
            }
            break;
        case 'l':
            console.log('left');
            if (skcli.lPanelOpen) {
                // close panel
                document.querySelector('.sk-cli__middle__left').classList.remove('sk-cli__middle__left--expanded')
                document.querySelector('.sk-cli__middle__left').classList.add('sk-cli__middle__left--collapsed')
                skcli.lPanelOpen = false
                console.log('left expanded')
            } else {
                // open panel
                document.querySelector('.sk-cli__middle__left').classList.remove('sk-cli__middle__left--collapsed')
                document.querySelector('.sk-cli__middle__left').classList.add('sk-cli__middle__left--expanded')
                skcli.lPanelOpen = true
                console.log('left collapsed')
            }
            break;
        case 'r':
            console.log('right');
            if (skcli.rPanelOpen) {
                // close panel
                document.querySelector('.sk-cli__middle__right').classList.remove('sk-cli__middle__right--expanded')
                document.querySelector('.sk-cli__middle__right').classList.add('sk-cli__middle__right--collapsed')
                skcli.rPanelOpen = false
                console.log('right expanded')
            } else {
                // open panel
                document.querySelector('.sk-cli__middle__right').classList.remove('sk-cli__middle__right--collapsed')
                document.querySelector('.sk-cli__middle__right').classList.add('sk-cli__middle__right--expanded')
                skcli.rPanelOpen = true
                console.log('right collapsed')
            }
            break;
        case 'a':
            console.log('all');
            if (skcli.aPanelOpen) {
                // close all panels
                document.querySelector('.sk-cli__top').classList.remove('sk-cli__top--expanded')
                document.querySelector('.sk-cli__top').classList.add('sk-cli__top--collapsed')
                document.querySelector('.sk-cli__bottom').classList.remove('sk-cli__bottom--expanded')
                document.querySelector('.sk-cli__bottom').classList.add('sk-cli__bottom--collapsed')
                document.querySelector('.sk-cli__middle__left').classList.remove('sk-cli__middle__left--expanded')
                document.querySelector('.sk-cli__middle__left').classList.add('sk-cli__middle__left--collapsed')
                document.querySelector('.sk-cli__middle__right').classList.remove('sk-cli__middle__right--expanded')
                document.querySelector('.sk-cli__middle__right').classList.add('sk-cli__middle__right--collapsed')
                skcli.aPanelOpen = false
                console.log('all collapsed')
            } else {
                // open all panels
                document.querySelector('.sk-cli__top').classList.add('sk-cli__top--expanded')
                document.querySelector('.sk-cli__top').classList.remove('sk-cli__top--collapsed')
                document.querySelector('.sk-cli__bottom').classList.add('sk-cli__bottom--expanded')
                document.querySelector('.sk-cli__bottom').classList.remove('sk-cli__bottom--collapsed')
                document.querySelector('.sk-cli__middle__left').classList.add('sk-cli__middle__left--expanded')
                document.querySelector('.sk-cli__middle__left').classList.remove('sk-cli__middle__left--collapsed')
                document.querySelector('.sk-cli__middle__right').classList.add('sk-cli__middle__right--expanded')
                document.querySelector('.sk-cli__middle__right').classList.remove('sk-cli__middle__right--collapsed')
                skcli.aPanelOpen = true
                console.log('all expanded')
                // write simcodes
                skcli.writeSimcodes()
            }
            break;
        default:
            console.log('error in skcli.togglePanel');
    }
}
skcli.staggerOpenPanels = function () {

    // stagger-open panels
    setTimeout(function () {
        // open top
        skcli.togglePanel('t')
    }, 0)
    setTimeout(function () {
        // open bottom
        skcli.togglePanel('r')
    }, 400)
    setTimeout(function () {
        // open right
        skcli.togglePanel('b')
    }, 1200)
    setTimeout(function () {
        // open left
        skcli.togglePanel('l')
    }, 1500)

}
skcli.simcodes = [
    `
struct group_info init_groups = { .usage = ATOMIC_INIT(2) }; struct group_info *groups_alloc(int gidsetsize){ struct group_info *group_info; int nblocks; int i;
 nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK; /* Make sure we always allocate at least one indirect block pointer */ nblocks = nblocks ? : 1; group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER); if (!group_info) return NULL; group_info->ngroups = gidsetsize; group_info->nblocks = nblocks; atomic_set(&group_info->usage, 1); if (gidsetsize <= NGROUPS_SMALL) group_info->blocks[0] = group_info->small_block; else {
 for (i = 0; i < nblocks; i++) { gid_t *b; b = (void *)__get_free_page(GFP_USER); if (!b)
 goto out_undo_partial_alloc; group_info->blocks[i] = b; }
 }
 return group_info; out_undo_partial_alloc: while (--i >= 0) { free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); return NULL; }
 EXPORT_SYMBOL(groups_alloc); void groups_free(struct group_info *group_info) {
 if (group_info->blocks[0] != group_info->small_block) { int i;
 for (i = 0; i < group_info->nblocks; i++) free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); }
 EXPORT_SYMBOL(groups_free); /* export the group_info to a user-space array */ static int groups_to_user(gid_t __user *grouplist, const struct group_info *group_info) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_to_user(grouplist, group_info->blocks[i], len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* fill a group_info from a user-space array - it must be allocated already */ static int groups_from_user(struct group_info *group_info, gid_t __user *grouplist) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_from_user(group_info->blocks[i], grouplist, len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* a simple Shell sort */ static void groups_sort(struct group_info *group_info) {
 int base, max, stride; int gidsetsize = group_info->ngroups; for (stride = 1; stride < gidsetsize; stride = 3 * stride + 1) ; /* nothing */ stride /= 3; while (stride) { max = gidsetsize - stride; for (base = 0; base < max; base++) { int left = base; int right = left + stride; gid_t tmp = GROUP_AT(group_info, right); while (left >= 0 && GROUP_AT(group_info, left) > tmp) { GROUP_AT(group_info, right) = GROUP_AT(group_info, left); right = left; left -= stride; }
 GROUP_AT(group_info, right) = tmp; }
 stride /= 3; }
 }
 /* a simple bsearch */ int groups_search(const struct group_info *group_info, gid_t grp) {
 unsigned int left, right; if (!group_info) return 0; left = 0; right = group_info->ngroups; while (left < right) { unsigned int mid = left + (right - left)/2; if (grp > GROUP_AT(group_info, mid)) left = mid + 1; else if (grp < GROUP_AT(group_info, mid)) right = mid; else
 return 1; }
 return 0; }
 /**
 * set_groups - Change a group subscription in a set of credentials * @new: The newly prepared set of credentials to alter * @group_info: The group list to install *
 * Validate a group subscription and, if valid, insert it into a set * of credentials.
 */
 int set_groups(struct cred *new, struct group_info *group_info) {
 put_group_info(new->group_info); groups_sort(group_info); get_group_info(group_info); new->group_info = group_info; return 0; }
 EXPORT_SYMBOL(set_groups); /**
 * set_current_groups - Change current's group subscription * @group_info: The group list to impose *
 * Validate a group subscription and, if valid, impose it upon current's task * security record.
 */
 int set_current_groups(struct group_info *group_info) {
 struct cred *new; int ret;
 new = prepare_creds(); if (!new) return -ENOMEM; ret = set_groups(new, group_info); if (ret < 0) { abort_creds(new); return ret; }
 return commit_creds(new); }
 EXPORT_SYMBOL(set_current_groups); SYSCALL_DEFINE2(getgroups, int, gidsetsize, gid_t __user *, grouplist) {
 const struct cred *cred = current_cred(); int i;
 if (gidsetsize < 0) return -EINVAL; /* no need to grab task_lock here; it cannot change */ i = cred->group_info->ngroups; if (gidsetsize) { if (i > gidsetsize) { i = -EINVAL; goto out; }
 if (groups_to_user(grouplist, cred->group_info)) { i = -EFAULT; goto out; }
 }
 out:
 return i; }
 /*
 *	SMP: Our groups are copy-on-write. We can set them safely *	without another task interfering.
 */
 SYSCALL_DEFINE2(setgroups, int, gidsetsize, gid_t __user *, grouplist) {
 struct group_info *group_info; int retval; if (!nsown_capable(CAP_SETGID)) return -EPERM; if ((unsigned)gidsetsize > NGROUPS_MAX) return -EINVAL; group_info = groups_alloc(gidsetsize); if (!group_info) return -ENOMEM; retval = groups_from_user(group_info, grouplist); if (retval) { put_group_info(group_info); return retval; }
 retval = set_current_groups(group_info); put_group_info(group_info); return retval; }
 /*
 * Check whether we're fsgid/egid or in the supplemental group..
 */
 int in_group_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->fsgid) retval = groups_search(cred->group_info, grp); return retval; }
 EXPORT_SYMBOL(in_group_p); int in_egroup_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->egid) retval = groups_search(cred->group_info, grp); return retval; }
  `,
    `
struct group_info init_groups = { .usage = ATOMIC_INIT(2) }; struct group_info *groups_alloc(int gidsetsize){ struct group_info *group_info; int nblocks; int i;
 nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK; /* Make sure we always allocate at least one indirect block pointer */ nblocks = nblocks ? : 1; group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER); if (!group_info) return NULL; group_info->ngroups = gidsetsize; group_info->nblocks = nblocks; atomic_set(&group_info->usage, 1); if (gidsetsize <= NGROUPS_SMALL) group_info->blocks[0] = group_info->small_block; else {
 for (i = 0; i < nblocks; i++) { gid_t *b; b = (void *)__get_free_page(GFP_USER); if (!b)
 goto out_undo_partial_alloc; group_info->blocks[i] = b; }
 }
 return group_info; out_undo_partial_alloc: while (--i >= 0) { free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); return NULL; }
 EXPORT_SYMBOL(groups_alloc); void groups_free(struct group_info *group_info) {
 if (group_info->blocks[0] != group_info->small_block) { int i;
 for (i = 0; i < group_info->nblocks; i++) free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); }
 EXPORT_SYMBOL(groups_free); /* export the group_info to a user-space array */ static int groups_to_user(gid_t __user *grouplist, const struct group_info *group_info) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_to_user(grouplist, group_info->blocks[i], len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* fill a group_info from a user-space array - it must be allocated already */ static int groups_from_user(struct group_info *group_info, gid_t __user *grouplist) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_from_user(group_info->blocks[i], grouplist, len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* a simple Shell sort */ static void groups_sort(struct group_info *group_info) {
 int base, max, stride; int gidsetsize = group_info->ngroups; for (stride = 1; stride < gidsetsize; stride = 3 * stride + 1) ; /* nothing */ stride /= 3; while (stride) { max = gidsetsize - stride; for (base = 0; base < max; base++) { int left = base; int right = left + stride; gid_t tmp = GROUP_AT(group_info, right); while (left >= 0 && GROUP_AT(group_info, left) > tmp) { GROUP_AT(group_info, right) = GROUP_AT(group_info, left); right = left; left -= stride; }
 GROUP_AT(group_info, right) = tmp; }
 stride /= 3; }
 }
 /* a simple bsearch */ int groups_search(const struct group_info *group_info, gid_t grp) {
 unsigned int left, right; if (!group_info) return 0; left = 0; right = group_info->ngroups; while (left < right) { unsigned int mid = left + (right - left)/2; if (grp > GROUP_AT(group_info, mid)) left = mid + 1; else if (grp < GROUP_AT(group_info, mid)) right = mid; else
 return 1; }
 return 0; }
 /**
 * set_groups - Change a group subscription in a set of credentials * @new: The newly prepared set of credentials to alter * @group_info: The group list to install *
 * Validate a group subscription and, if valid, insert it into a set * of credentials.
 */
 int set_groups(struct cred *new, struct group_info *group_info) {
 put_group_info(new->group_info); groups_sort(group_info); get_group_info(group_info); new->group_info = group_info; return 0; }
 EXPORT_SYMBOL(set_groups); /**
 * set_current_groups - Change current's group subscription * @group_info: The group list to impose *
 * Validate a group subscription and, if valid, impose it upon current's task * security record.
 */
 int set_current_groups(struct group_info *group_info) {
 struct cred *new; int ret;
 new = prepare_creds(); if (!new) return -ENOMEM; ret = set_groups(new, group_info); if (ret < 0) { abort_creds(new); return ret; }
 return commit_creds(new); }
 EXPORT_SYMBOL(set_current_groups); SYSCALL_DEFINE2(getgroups, int, gidsetsize, gid_t __user *, grouplist) {
 const struct cred *cred = current_cred(); int i;
 if (gidsetsize < 0) return -EINVAL; /* no need to grab task_lock here; it cannot change */ i = cred->group_info->ngroups; if (gidsetsize) { if (i > gidsetsize) { i = -EINVAL; goto out; }
 if (groups_to_user(grouplist, cred->group_info)) { i = -EFAULT; goto out; }
 }
 out:
 return i; }
 /*
 *	SMP: Our groups are copy-on-write. We can set them safely *	without another task interfering.
 */
 SYSCALL_DEFINE2(setgroups, int, gidsetsize, gid_t __user *, grouplist) {
 struct group_info *group_info; int retval; if (!nsown_capable(CAP_SETGID)) return -EPERM; if ((unsigned)gidsetsize > NGROUPS_MAX) return -EINVAL; group_info = groups_alloc(gidsetsize); if (!group_info) return -ENOMEM; retval = groups_from_user(group_info, grouplist); if (retval) { put_group_info(group_info); return retval; }
 retval = set_current_groups(group_info); put_group_info(group_info); return retval; }
 /*
 * Check whether we're fsgid/egid or in the supplemental group..
 */
 int in_group_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->fsgid) retval = groups_search(cred->group_info, grp); return retval; }
 EXPORT_SYMBOL(in_group_p); int in_egroup_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->egid) retval = groups_search(cred->group_info, grp); return retval; }
  `,
    `
struct group_info init_groups = { .usage = ATOMIC_INIT(2) }; struct group_info *groups_alloc(int gidsetsize){ struct group_info *group_info; int nblocks; int i;
 nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK; /* Make sure we always allocate at least one indirect block pointer */ nblocks = nblocks ? : 1; group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER); if (!group_info) return NULL; group_info->ngroups = gidsetsize; group_info->nblocks = nblocks; atomic_set(&group_info->usage, 1); if (gidsetsize <= NGROUPS_SMALL) group_info->blocks[0] = group_info->small_block; else {
 for (i = 0; i < nblocks; i++) { gid_t *b; b = (void *)__get_free_page(GFP_USER); if (!b)
 goto out_undo_partial_alloc; group_info->blocks[i] = b; }
 }
 return group_info; out_undo_partial_alloc: while (--i >= 0) { free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); return NULL; }
 EXPORT_SYMBOL(groups_alloc); void groups_free(struct group_info *group_info) {
 if (group_info->blocks[0] != group_info->small_block) { int i;
 for (i = 0; i < group_info->nblocks; i++) free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); }
 EXPORT_SYMBOL(groups_free); /* export the group_info to a user-space array */ static int groups_to_user(gid_t __user *grouplist, const struct group_info *group_info) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_to_user(grouplist, group_info->blocks[i], len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* fill a group_info from a user-space array - it must be allocated already */ static int groups_from_user(struct group_info *group_info, gid_t __user *grouplist) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_from_user(group_info->blocks[i], grouplist, len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* a simple Shell sort */ static void groups_sort(struct group_info *group_info) {
 int base, max, stride; int gidsetsize = group_info->ngroups; for (stride = 1; stride < gidsetsize; stride = 3 * stride + 1) ; /* nothing */ stride /= 3; while (stride) { max = gidsetsize - stride; for (base = 0; base < max; base++) { int left = base; int right = left + stride; gid_t tmp = GROUP_AT(group_info, right); while (left >= 0 && GROUP_AT(group_info, left) > tmp) { GROUP_AT(group_info, right) = GROUP_AT(group_info, left); right = left; left -= stride; }
 GROUP_AT(group_info, right) = tmp; }
 stride /= 3; }
 }
 /* a simple bsearch */ int groups_search(const struct group_info *group_info, gid_t grp) {
 unsigned int left, right; if (!group_info) return 0; left = 0; right = group_info->ngroups; while (left < right) { unsigned int mid = left + (right - left)/2; if (grp > GROUP_AT(group_info, mid)) left = mid + 1; else if (grp < GROUP_AT(group_info, mid)) right = mid; else
 return 1; }
 return 0; }
 /**
 * set_groups - Change a group subscription in a set of credentials * @new: The newly prepared set of credentials to alter * @group_info: The group list to install *
 * Validate a group subscription and, if valid, insert it into a set * of credentials.
 */
 int set_groups(struct cred *new, struct group_info *group_info) {
 put_group_info(new->group_info); groups_sort(group_info); get_group_info(group_info); new->group_info = group_info; return 0; }
 EXPORT_SYMBOL(set_groups); /**
 * set_current_groups - Change current's group subscription * @group_info: The group list to impose *
 * Validate a group subscription and, if valid, impose it upon current's task * security record.
 */
 int set_current_groups(struct group_info *group_info) {
 struct cred *new; int ret;
 new = prepare_creds(); if (!new) return -ENOMEM; ret = set_groups(new, group_info); if (ret < 0) { abort_creds(new); return ret; }
 return commit_creds(new); }
 EXPORT_SYMBOL(set_current_groups); SYSCALL_DEFINE2(getgroups, int, gidsetsize, gid_t __user *, grouplist) {
 const struct cred *cred = current_cred(); int i;
 if (gidsetsize < 0) return -EINVAL; /* no need to grab task_lock here; it cannot change */ i = cred->group_info->ngroups; if (gidsetsize) { if (i > gidsetsize) { i = -EINVAL; goto out; }
 if (groups_to_user(grouplist, cred->group_info)) { i = -EFAULT; goto out; }
 }
 out:
 return i; }
 /*
 *	SMP: Our groups are copy-on-write. We can set them safely *	without another task interfering.
 */
 SYSCALL_DEFINE2(setgroups, int, gidsetsize, gid_t __user *, grouplist) {
 struct group_info *group_info; int retval; if (!nsown_capable(CAP_SETGID)) return -EPERM; if ((unsigned)gidsetsize > NGROUPS_MAX) return -EINVAL; group_info = groups_alloc(gidsetsize); if (!group_info) return -ENOMEM; retval = groups_from_user(group_info, grouplist); if (retval) { put_group_info(group_info); return retval; }
 retval = set_current_groups(group_info); put_group_info(group_info); return retval; }
 /*
 * Check whether we're fsgid/egid or in the supplemental group..
 */
 int in_group_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->fsgid) retval = groups_search(cred->group_info, grp); return retval; }
 EXPORT_SYMBOL(in_group_p); int in_egroup_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->egid) retval = groups_search(cred->group_info, grp); return retval; }
  `,
    `
struct group_info init_groups = { .usage = ATOMIC_INIT(2) }; struct group_info *groups_alloc(int gidsetsize){ struct group_info *group_info; int nblocks; int i;
 nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK; /* Make sure we always allocate at least one indirect block pointer */ nblocks = nblocks ? : 1; group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER); if (!group_info) return NULL; group_info->ngroups = gidsetsize; group_info->nblocks = nblocks; atomic_set(&group_info->usage, 1); if (gidsetsize <= NGROUPS_SMALL) group_info->blocks[0] = group_info->small_block; else {
 for (i = 0; i < nblocks; i++) { gid_t *b; b = (void *)__get_free_page(GFP_USER); if (!b)
 goto out_undo_partial_alloc; group_info->blocks[i] = b; }
 }
 return group_info; out_undo_partial_alloc: while (--i >= 0) { free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); return NULL; }
 EXPORT_SYMBOL(groups_alloc); void groups_free(struct group_info *group_info) {
 if (group_info->blocks[0] != group_info->small_block) { int i;
 for (i = 0; i < group_info->nblocks; i++) free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); }
 EXPORT_SYMBOL(groups_free); /* export the group_info to a user-space array */ static int groups_to_user(gid_t __user *grouplist, const struct group_info *group_info) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_to_user(grouplist, group_info->blocks[i], len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* fill a group_info from a user-space array - it must be allocated already */ static int groups_from_user(struct group_info *group_info, gid_t __user *grouplist) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_from_user(group_info->blocks[i], grouplist, len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* a simple Shell sort */ static void groups_sort(struct group_info *group_info) {
 int base, max, stride; int gidsetsize = group_info->ngroups; for (stride = 1; stride < gidsetsize; stride = 3 * stride + 1) ; /* nothing */ stride /= 3; while (stride) { max = gidsetsize - stride; for (base = 0; base < max; base++) { int left = base; int right = left + stride; gid_t tmp = GROUP_AT(group_info, right); while (left >= 0 && GROUP_AT(group_info, left) > tmp) { GROUP_AT(group_info, right) = GROUP_AT(group_info, left); right = left; left -= stride; }
 GROUP_AT(group_info, right) = tmp; }
 stride /= 3; }
 }
 /* a simple bsearch */ int groups_search(const struct group_info *group_info, gid_t grp) {
 unsigned int left, right; if (!group_info) return 0; left = 0; right = group_info->ngroups; while (left < right) { unsigned int mid = left + (right - left)/2; if (grp > GROUP_AT(group_info, mid)) left = mid + 1; else if (grp < GROUP_AT(group_info, mid)) right = mid; else
 return 1; }
 return 0; }
 /**
 * set_groups - Change a group subscription in a set of credentials * @new: The newly prepared set of credentials to alter * @group_info: The group list to install *
 * Validate a group subscription and, if valid, insert it into a set * of credentials.
 */
 int set_groups(struct cred *new, struct group_info *group_info) {
 put_group_info(new->group_info); groups_sort(group_info); get_group_info(group_info); new->group_info = group_info; return 0; }
 EXPORT_SYMBOL(set_groups); /**
 * set_current_groups - Change current's group subscription * @group_info: The group list to impose *
 * Validate a group subscription and, if valid, impose it upon current's task * security record.
 */
 int set_current_groups(struct group_info *group_info) {
 struct cred *new; int ret;
 new = prepare_creds(); if (!new) return -ENOMEM; ret = set_groups(new, group_info); if (ret < 0) { abort_creds(new); return ret; }
 return commit_creds(new); }
 EXPORT_SYMBOL(set_current_groups); SYSCALL_DEFINE2(getgroups, int, gidsetsize, gid_t __user *, grouplist) {
 const struct cred *cred = current_cred(); int i;
 if (gidsetsize < 0) return -EINVAL; /* no need to grab task_lock here; it cannot change */ i = cred->group_info->ngroups; if (gidsetsize) { if (i > gidsetsize) { i = -EINVAL; goto out; }
 if (groups_to_user(grouplist, cred->group_info)) { i = -EFAULT; goto out; }
 }
 out:
 return i; }
 /*
 *	SMP: Our groups are copy-on-write. We can set them safely *	without another task interfering.
 */
 SYSCALL_DEFINE2(setgroups, int, gidsetsize, gid_t __user *, grouplist) {
 struct group_info *group_info; int retval; if (!nsown_capable(CAP_SETGID)) return -EPERM; if ((unsigned)gidsetsize > NGROUPS_MAX) return -EINVAL; group_info = groups_alloc(gidsetsize); if (!group_info) return -ENOMEM; retval = groups_from_user(group_info, grouplist); if (retval) { put_group_info(group_info); return retval; }
 retval = set_current_groups(group_info); put_group_info(group_info); return retval; }
 /*
 * Check whether we're fsgid/egid or in the supplemental group..
 */
 int in_group_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->fsgid) retval = groups_search(cred->group_info, grp); return retval; }
 EXPORT_SYMBOL(in_group_p); int in_egroup_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->egid) retval = groups_search(cred->group_info, grp); return retval; }
  `,
    `
struct group_info init_groups = { .usage = ATOMIC_INIT(2) }; struct group_info *groups_alloc(int gidsetsize){ struct group_info *group_info; int nblocks; int i;
 nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK; /* Make sure we always allocate at least one indirect block pointer */ nblocks = nblocks ? : 1; group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER); if (!group_info) return NULL; group_info->ngroups = gidsetsize; group_info->nblocks = nblocks; atomic_set(&group_info->usage, 1); if (gidsetsize <= NGROUPS_SMALL) group_info->blocks[0] = group_info->small_block; else {
 for (i = 0; i < nblocks; i++) { gid_t *b; b = (void *)__get_free_page(GFP_USER); if (!b)
 goto out_undo_partial_alloc; group_info->blocks[i] = b; }
 }
 return group_info; out_undo_partial_alloc: while (--i >= 0) { free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); return NULL; }
 EXPORT_SYMBOL(groups_alloc); void groups_free(struct group_info *group_info) {
 if (group_info->blocks[0] != group_info->small_block) { int i;
 for (i = 0; i < group_info->nblocks; i++) free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); }
 EXPORT_SYMBOL(groups_free); /* export the group_info to a user-space array */ static int groups_to_user(gid_t __user *grouplist, const struct group_info *group_info) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_to_user(grouplist, group_info->blocks[i], len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* fill a group_info from a user-space array - it must be allocated already */ static int groups_from_user(struct group_info *group_info, gid_t __user *grouplist) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_from_user(group_info->blocks[i], grouplist, len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* a simple Shell sort */ static void groups_sort(struct group_info *group_info) {
 int base, max, stride; int gidsetsize = group_info->ngroups; for (stride = 1; stride < gidsetsize; stride = 3 * stride + 1) ; /* nothing */ stride /= 3; while (stride) { max = gidsetsize - stride; for (base = 0; base < max; base++) { int left = base; int right = left + stride; gid_t tmp = GROUP_AT(group_info, right); while (left >= 0 && GROUP_AT(group_info, left) > tmp) { GROUP_AT(group_info, right) = GROUP_AT(group_info, left); right = left; left -= stride; }
 GROUP_AT(group_info, right) = tmp; }
 stride /= 3; }
 }
 /* a simple bsearch */ int groups_search(const struct group_info *group_info, gid_t grp) {
 unsigned int left, right; if (!group_info) return 0; left = 0; right = group_info->ngroups; while (left < right) { unsigned int mid = left + (right - left)/2; if (grp > GROUP_AT(group_info, mid)) left = mid + 1; else if (grp < GROUP_AT(group_info, mid)) right = mid; else
 return 1; }
 return 0; }
 /**
 * set_groups - Change a group subscription in a set of credentials * @new: The newly prepared set of credentials to alter * @group_info: The group list to install *
 * Validate a group subscription and, if valid, insert it into a set * of credentials.
 */
 int set_groups(struct cred *new, struct group_info *group_info) {
 put_group_info(new->group_info); groups_sort(group_info); get_group_info(group_info); new->group_info = group_info; return 0; }
 EXPORT_SYMBOL(set_groups); /**
 * set_current_groups - Change current's group subscription * @group_info: The group list to impose *
 * Validate a group subscription and, if valid, impose it upon current's task * security record.
 */
 int set_current_groups(struct group_info *group_info) {
 struct cred *new; int ret;
 new = prepare_creds(); if (!new) return -ENOMEM; ret = set_groups(new, group_info); if (ret < 0) { abort_creds(new); return ret; }
 return commit_creds(new); }
 EXPORT_SYMBOL(set_current_groups); SYSCALL_DEFINE2(getgroups, int, gidsetsize, gid_t __user *, grouplist) {
 const struct cred *cred = current_cred(); int i;
 if (gidsetsize < 0) return -EINVAL; /* no need to grab task_lock here; it cannot change */ i = cred->group_info->ngroups; if (gidsetsize) { if (i > gidsetsize) { i = -EINVAL; goto out; }
 if (groups_to_user(grouplist, cred->group_info)) { i = -EFAULT; goto out; }
 }
 out:
 return i; }
 /*
 *	SMP: Our groups are copy-on-write. We can set them safely *	without another task interfering.
 */
 SYSCALL_DEFINE2(setgroups, int, gidsetsize, gid_t __user *, grouplist) {
 struct group_info *group_info; int retval; if (!nsown_capable(CAP_SETGID)) return -EPERM; if ((unsigned)gidsetsize > NGROUPS_MAX) return -EINVAL; group_info = groups_alloc(gidsetsize); if (!group_info) return -ENOMEM; retval = groups_from_user(group_info, grouplist); if (retval) { put_group_info(group_info); return retval; }
 retval = set_current_groups(group_info); put_group_info(group_info); return retval; }
 /*
 * Check whether we're fsgid/egid or in the supplemental group..
 */
 int in_group_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->fsgid) retval = groups_search(cred->group_info, grp); return retval; }
 EXPORT_SYMBOL(in_group_p); int in_egroup_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->egid) retval = groups_search(cred->group_info, grp); return retval; }
  `,
    `
lmtw2
01001001 01110100 00100000 01110011 01110100 01100001 01110010 01110100 01100101 01100100 00100000 01101001 01101110 00100000 01101101 01110101 01100100 00101100 00100000 01100001 01110011 00100000 01101101 01100001 01101110 01111001 00100000 01110100 01101000 01101001 01101110 01100111 01110011 00100000 01100100 01101111 00101110 00100000 01001001 01101110 00100000 01100001 00100000 01101110 01101111 01110010 01101101 01100001 01101100 00100000 01110111 01101111 01110010 01101100 01100100 00101100 00100000 01101001 01110100 00100000 01110111 01101111 01110101 01101100 01100100 00100000 01101000 01100001 01110110 01100101 00100000 01100010 01100101 01100101 01101110 00100000 01110100 01101001 01101101 01100101 00100000 01100110 01101111 01110010 00100000 01100010 01110010 01100101 01100001 01101011 01100110 01100001 01110011 01110100 00101100 00100000 01100010 01110101 01110100 00100000 01100001 01110000 01110000 01100001 01110010 01100101 01101110 01110100 01101100 01111001 00100000 01100010 01110010 01100101 01100001 01101011 01100110 01100001 01110011 01110100 00100000 01110111 01100001 01110011 00100000 01101110 01101111 01110100 00100000 01110011 01100101 01110010 01110110 01100101 01100100 00100000 01101001 01101110 00100000 01101000 01100101 01101100 01101100 00101110 00100000 01010100 01101000 01100101 00100000 01100010 01101111 01101101 01100010 01100001 01110010 01100100 01101101 01100101 01101110 01110100 00100000 01110100 01101000 01100001 01110100 00100000 01101000 01100001 01100100 00100000 01100010 01100101 01100111 01110101 01101110 00100000 01100010 01100101 01100110 01101111 01110010 01100101 00100000 01100100 01100001 01110111 01101110 00100000 01110011 01101000 01101111 01110111 01100101 01100100 00100000 01101110 01101111 00100000 01110011 01101001 01100111 01101110 01110011 00100000 01101111 01100110 00100000 01101100 01100101 01110100 01110100 01101001 01101110 01100111 00100000 01110101 01110000 00101110 00100000 01010000 01110010 01101001 01110110 01100001 01110100 01100101 00100000 01001010 01101111 01101110 01100001 01110011 00100000 01100100 01101001 01100100 00100000 01101110 01101111 01110100 00100000 01100110 01100101 01100101 01101100 00100000 01101101 01110101 01100011 01101000 00100000 01101100 01101001 01101011 01100101 00100000 01100101 01100001 01110100 01101001 01101110 01100111 00101100 00100000 01100001 01101110 01111001 01110111 01100001 01111001 00101110 01001001 01110100 00100000 01110011 01110100 01100001 01110010 01110100 01100101 01100100 00100000 01101001 01101110 00100000 01101101 01110101 01100100 00101100 00100000 01100001 01110011 00100000 01101101 01100001 01101110 01111001 00100000 01110100 01101000 01101001 01101110 01100111 01110011 00100000 01100100 01101111 00101110 00100000 01001001 01101110 00100000 01100001 00100000 01101110 01101111 01110010 01101101 01100001 01101100 00100000 01110111 01101111 01110010 01101100 01100100 00101100 00100000 01101001 01110100 00100000 01110111 01101111 01110101 01101100 01100100 00100000 01101000 01100001 01110110 01100101 00100000 01100010 01100101 01100101 01101110 00100000 01110100 01101001 01101101 01100101 00100000 01100110 01101111 01110010 00100000 01100010 01110010 01100101 01100001 01101011 01100110 01100001 01110011 01110100 00101100 00100000 01100010 01110101 01110100 00100000 01100001 01110000 01110000 01100001 01110010 01100101 01101110 01110100 01101100 01111001 00100000 01100010 01110010 01100101 01100001 01101011 01100110 01100001 01110011 01110100 00100000 01110111 01100001 01110011 00100000 01101110 01101111 01110100 00100000 01110011 01100101 01110010 01110110 01100101 01100100 00100000 01101001 01101110 00100000 01101000 01100101 01101100 01101100 00101110 00100000 01010100 01101000 01100101 00100000 01100010 01101111 01101101 01100010 01100001 01110010 01100100 01101101 01100101 01101110 01110100 00100000 01110100 01101000 01100001 01110100 00100000 01101000 01100001 01100100 00100000 01100010 01100101 01100111 01110101 01101110 00100000 01100010 01100101 01100110 01101111 01110010 01100101 00100000 01100100 01100001 01110111 01101110 00100000 01110011 01101000 01101111 01110111 01100101 01100100 00100000 01101110 01101111 00100000 01110011 01101001 01100111 01101110 01110011 00100000 01101111 01100110 00100000 01101100 01100101 01110100 01110100 01101001 01101110 01100111 00100000 01110101 01110000 00101110 00100000 01010000 01110010 01101001 01110110 01100001 01110100 01100101 00100000 01001010 01101111 01101110 01100001 01110011 00100000 01100100 01101001 01100100 00100000 01101110 01101111 01110100 00100000 01100110 01100101 01100101 01101100 00100000 01101101 01110101 01100011 01101000 00100000 01101100 01101001 01101011 01100101 00100000 01100101 01100001 01110100 01101001 01101110 01100111 00101100 00100000 01100001 01101110 01111001 01110111 01100001 01111001 00101110 01101111 01110100 00100000 01110011 01100101 01110010 01110110 01100101 01100100 00100000 01101001 01101110 00100000 01101000 01100101 01101100 01101100 00101110 00100000 01010100 01101000 01100101 00100000 01100010 01101111 01101101 01100010 01100001 01110010 01100100 01101101 01100101 01101110 01110100 00100000 01110100 01101000 01100001 01110100 00100000 01101000 01100001 01100100 00100000 01100010 01100101 01100111 01110101 01101110 00100000 01100010 01100101 01100110 01101111 01110010 01100101 00100000 01100100 01100001 01110111 01101110 00100000 01110011 01101000 01101111 01110111 01100101 01100100 00100000 01101110 01101111 00100000 01110011 01101001 01100111 01101110 01110011 00100000 01101111 01100110 00100000 01101100 01100101 01110100 01110100 01101001 01101110 01100111 00100000 01110101 01110000 00101110 00100000 01010000 01110010 01101001 01110110 01100001 01110100 01100101 00100000 01001010 01101111 01101110 01100001 01110011 00100000 01100100 01101001 01100100 00100000 01101110 01101111 01110100 00100000 01100110 01100101 01100101 01101100 00100000 01101101 01110101 01100011 01101000 00100000 01101100 01101001 01101011 01100101 00100000 01100101 01100001 01110100 01101001 01101110 01100111 00101100 00100000 01100001 01101110 01111001 01110111 01100001 01111001 00101110
  `,
    `
lbrand
Δ @ q μ t B 7 i λ K c € r Ψ õ C Φ V 4 D * 3 E α Σ f H β z Γ & 5 Ñ 6 M 9 g ω θ π 7 υ 1 S 8 ! 2 ^ Y X à ô # ̈ P @ ^ ~ + L ( [ U ) ≠ R @ h 0 _ T j W J k { } e , ] p < > . ? / : | Â I ë O q G " ! z δ 2 @ Å μ 7 r Î ç Ω λ 9 K 6 ë V 1 Ô H ¤ α z Φ 3 ê G g π T Σ # 8 h Γ υ Ξ 4 ! 5 ^ $ õ ­ D ν θ y Δ £ S | 0 + L b Æ _ M [ ) =́ N * R @ f T j W J k { } Ë , ] : | Â ï Q q Z " υ ç S Φ E μ λ θ Ω h π K £ Ξ a Δ i 2 Ž Y R n 9 Å β õ W 7 $ ­ Γ f̂ X̂ 3 Σ ê 1 γ ô δ ̈ ̄ 8 T Ĵ Ü Ï Δ Ļ m § ψ 0 Ĥ 4 ̧ Π k 6 V ( 5 * ̀ ≠ ρ ̧ Ğ % Ý Κ Ψ ď α ς q ¤ æ ; # ® o @ ! ž Ν̃ Q̃ ý 1 p 7 _ ø § ø Õ ζ ̌ × ^ ω ̄ 6 α 8 @ ̨ £ Đ Ε ç Ĵ ≠ ê 2 Ž t [ ́ Ĵ E J b́ a 2 $ ̧ Ο ν Ž Ω Ļ Y £ 0 y Λ ̧ ( ̧ χ € Γ ̌ Ή æ £ b 9 Ñ ã 3 f ́ § v̌ Ï m β Ç t Δ Å g # Δ I ÿ É Ρ õ 3 Ο ς I Ω Σ ( ̧ γ & ̌ Œ ̈ ̧ c U z ̇ ^ Q X x ̧ ̆ ŵ | φ ̂ T b Τ ž η ̧ ̌ Ť 1 p Κ Ύ - ̧ l 9 [ ̧ 9 x ̌ Ź Y 9 x̂ b 2 t ̧ H 7 Y l Ö μ̀ u Θ Ν 9 ̧ Ñ g I λ D 8́ a 0 - 1 X̌ _ I ž δ 0 F 2 à k Ω ] ̌ ̧ Η ̂ ̧ æ Ε Η ̂ Π 9 ; ̧ x ε̂ + ̌ F ŵ ̄ å ́ Ţ ̄ R Z u θ X̂ ď W £ ́ S x̂ e I ý ë p ξ Á N 6 V χ ̧ ̌ Ľ _ Q̃ Ç ̌ Ĵ Ļ Χ ̄ a̧ ̄ ψ ř d Í y τ Æ ε̌ m ̧ ] ï ® d 4 ú Ł ́ 7 ̧ Τ ̧ 5 ̧ Š f X 2̌ ͂ Ν ̧ Α ̧ Γ 7 r Ê H ̌ w ε ś Θ ̌ h ̧ b Ù P̀ Ĵ Π ň 1 ̧ ͅ H # ́ ^ ̌ Ŵ λ ͂ μ Ļ C k ̧ q̌ Ζ ́ ņ ̄ ƒ ÿ o Δ @ q μ t B 7 i λ K c € r Ψ õ C Φ V 4 D * 3 E α Σ f H β z Γ & 5 Ñ 6 M 9 g ω θ π 7 υ 1 S 8 ! 2 ^ Y X à ô # ̈ P @ ^ ~ + L ( [ U ) ≠ R @ h 0 _ T j W J k { } e , ] p < > . ? / : | Â I ë O q G " ! z δ 2 @ Å μ 7 r Î ç Ω λ 9 K 6 ë V 1 Ô H ¤ α z Φ 3 ê G g π T Σ # 8 h Γ υ Ξ 4 ! 5 ^ $ õ ­ D ν θ y Δ £ S | 0 + L b Æ _ M [ ) =́ N * R @ f T j W J k { } Ë , ] : | Â ï Q q Z " υ ç S Φ E μ λ θ Ω h π K £ Ξ a Δ i 2 Ž Y R n 9 Å β õ W 7 $ ­ Γ f̂ X̂ 3 Σ ê 1 γ ô δ ̈ ̄ 8 T Ĵ Ü Ï Δ Ļ m § ψ 0 Ĥ 4 ̧ Π k 6 V ( 5 * ̀ ≠ ρ ̧ Ğ % Ý Κ Ψ ď α ς q ¤ æ ; # ® o @ ! ž Ν̃ Q̃ ý 1 p 7 _ ø § ø Õ ζ ̌ × ^ ω ̄ 6 α 8 @ ̨ £ Đ Ε ç Ĵ ≠ ê 2 Ž t [ ́ Ĵ E J b́ a 2 $ ̧ Ο ν Ž Ω Ļ Y £ 0 y Λ ̧ ( ̧ χ € Γ ̌ Ή æ £ b 9 Ñ ã 3 f ́ § v̌ Ï m β Ç t Δ Å g # Δ I ÿ É Ρ õ 3 Ο ς I Ω Σ ( ̧ γ & ̌ Œ ̈ ̧ c U z ̇ ^ Q X x ̧ ̆ ŵ | φ ̂ T b Τ ž η ̧ ̌ Ť 1 p Κ Ύ - ̧ l 9 [ ̧ 9 x ̌ Ź Y 9 x̂ b 2 t ̧ H 7 Y l Ö μ̀ u Θ Ν 9 ̧ Ñ g I λ D 8́ a 0 - 1 X̌ _ I ž δ 0 F 2 à k Ω ] ̌ ̧ Η ̂ ̧ æ Ε Η ̂ Π 9 ; ̧ x ε̂ + ̌ F ŵ ̄ å ́ Ţ ̄ R Z u θ X̂ ď W £ ́ S x̂ e I ý ë p ξ Á N 6 V χ ̧ ̌ Ľ _ Q̃ Ç ̌ Ĵ Ļ Χ ̄ a̧ ̄ ψ ř d Í y τ Æ ε̌ m ̧ ] ï ® d 4 ú Ł ́ 7 ̧ Τ ̧ 5 ̧ Š f X 2̌ ͂ Ν ̧ Α ̧ Γ 7 r Ê H ̌ w ε ś Θ ̌ h ̧ b Ù P̀ Ĵ Π ň 1 ̧ ͅ H # ́ ^ ̌ Ŵ λ ͂ μ Ļ C k ̧ q̌ Ζ ́ ņ ̄ ƒ ÿ o Δ @ q μ t B 7 i λ K c € r Ψ õ C Φ V 4 D * 3 E α Σ f H β z Γ & 5 Ñ 6 M 9 g ω θ π 7 υ 1 S 8 ! 2 ^ Y X à ô # ̈ P @ ^ ~ + L ( [ U ) ≠ R @ h 0 _ T j W J k { } e , ] p < > . ? / : | Â I ë O q G " ! z δ 2 @ Å μ 7 r Î ç Ω λ 9 K 6 ë V 1 Ô H ¤ α z Φ 3 ê G g π T Σ # 8 h Γ υ Ξ 4 ! 5 ^ $ õ ­ D ν θ y Δ £ S | 0 + L b Æ _ M [ ) =́ N * R @ f T j W J k { } Ë , ] : | Â ï Q q Z " υ ç S Φ E μ λ θ Ω h π K £ Ξ a Δ i 2 Ž Y R n 9 Å β õ W 7 $ ­ Γ f̂ X̂ 3 Σ ê 1 γ ô δ ̈ ̄ 8 T Ĵ Ü Ï Δ Ļ m § ψ 0 Ĥ 4 ̧ Π k 6 V ( 5 * ̀ ≠ ρ ̧ Ğ % Ý Κ Ψ ď α ς q ¤ æ ; # ® o @ ! ž Ν̃ Q̃ ý 1 p 7 _ ø § ø Õ ζ ̌ × ^ ω ̄ 6 α 8 @ ̨ £ Đ Ε ç Ĵ ≠ ê 2 Ž t [ ́ Ĵ E J b́ a 2 $ ̧ Ο ν Ž Ω Ļ Y £ 0 y Λ ̧ ( ̧ χ € Γ ̌ Ή æ £ b 9 Ñ ã 3 f ́ § v̌ Ï m β Ç t Δ Å g # Δ I ÿ É Ρ õ 3 Ο ς I Ω Σ ( ̧ γ & ̌ Œ ̈ ̧ c U z ̇ ^ Q X x ̧ ̆ ŵ | φ ̂ T b Τ ž η ̧ ̌ Ť 1 p Κ Ύ - ̧ l 9 [ ̧ 9 x ̌ Ź Y 9 x̂ b 2 t ̧ H 7 Y l Ö μ̀ u Θ Ν 9 ̧ Ñ g I λ D 8́ a 0 - 1 X̌ _ I ž δ 0 F 2 à k Ω ] ̌ ̧ Η ̂ ̧ æ Ε Η ̂ Π 9 ; ̧ x ε̂ + ̌ F ŵ ̄ å ́ Ţ ̄ R Z u θ X̂ ď W £ ́ S x̂ e I ý ë p ξ Á N 6 V χ ̧ ̌ Ľ _ Q̃ Ç ̌ Ĵ Ļ Χ ̄ a̧ ̄ ψ ř d Í y τ Æ ε̌ m ̧ ] ï ® d 4 ú Ł ́ 7 ̧ Τ ̧ 5 ̧ Š f X 2̌ ͂ Ν ̧ Α ̧ Γ 7 r Ê H ̌ w ε ś Θ ̌ h ̧ b Ù P̀ Ĵ Π ň 1 ̧ ͅ H # ́ ^ ̌ Ŵ λ ͂ μ Ļ C k ̧ q̌ Ζ ́ ņ ̄ ƒ ÿ o Δ @ q μ t B 7 i λ K c € r Ψ õ C Φ V 4 D * 3 E α Σ f H β z Γ & 5 Ñ 6 M 9 g ω θ π 7 υ 1 S 8 ! 2 ^ Y X à ô # ̈ P @ ^ ~ + L ( [ U ) ≠ R @ h 0 _ T j W J k { } e , ] p < > . ? / : | Â I ë O q G " ! z δ 2 @ Å μ 7 r Î ç Ω λ 9 K 6 ë V 1 Ô H ¤ α z Φ 3 ê G g π T Σ # 8 h Γ υ Ξ 4 ! 5 ^ $ õ ­ D ν θ y Δ £ S | 0 + L b Æ _ M [ ) =́ N * R @ f T j W J k { } Ë , ] : | Â ï Q q Z " υ ç S Φ E μ λ θ Ω h π K £ Ξ a Δ i 2 Ž Y R n 9 Å β õ W 7 $ ­ Γ f̂ X̂ 3 Σ ê 1 γ ô δ ̈ ̄ 8 T Ĵ Ü Ï Δ Ļ m § ψ 0 Ĥ 4 ̧ Π k 6 V ( 5 * ̀ ≠ ρ ̧ Ğ % Ý Κ Ψ ď α ς q ¤ æ ; # ® o @ ! ž Ν̃ Q̃ ý 1 p 7 _ ø § ø Õ ζ ̌ × ^ ω ̄ 6 α 8 @ ̨ £ Đ Ε ç Ĵ ≠ ê 2 Ž t [ ́ Ĵ E J b́ a 2 $ ̧ Ο ν Ž Ω Ļ Y £ 0 y Λ ̧ ( ̧ χ € Γ ̌ Ή æ £ b 9 Ñ ã 3 f ́ § v̌ Ï m β Ç t Δ Å g # Δ I ÿ É Ρ õ 3 Ο ς I Ω Σ ( ̧ γ & ̌ Œ ̈ ̧ c U z ̇ ^ Q X x ̧ ̆ ŵ | φ ̂ T b Τ ž η ̧ ̌ Ť 1 p Κ Ύ - ̧ l 9 [ ̧ 9 x ̌ Ź Y 9 x̂ b 2 t ̧ H 7 Y l Ö μ̀ u Θ Ν 9 ̧ Ñ g I λ D 8́ a 0 - 1 X̌ _ I ž δ 0 F 2 à k Ω ] ̌ ̧ Η ̂ ̧ æ Ε Η ̂ Π 9 ; ̧ x ε̂ + ̌ F ŵ ̄ å ́ Ţ ̄ R Z u θ X̂ ď W £ ́ S x̂ e I ý ë p ξ Á N 6 V χ ̧ ̌ Ľ _ Q̃ Ç ̌ Ĵ Ļ Χ ̄ a̧ ̄ ψ ř d Í y τ Æ ε̌ m ̧ ] ï ® d 4 ú Ł ́ 7 ̧ Τ ̧ 5 ̧ Š f X 2̌ ͂ Ν ̧ Α ̧ Γ 7 r Ê H ̌ w ε ś Θ ̌ h ̧ b Ù P̀ Ĵ Π ň 1 ̧ ͅ H # ́ ^ ̌ Ŵ λ ͂ μ Ļ C k ̧ q̌ Ζ ́ ņ ̄ ƒ ÿ o Δ @ q μ t B 7 i λ K c € r Ψ õ C Φ V 4 D * 3 E α Σ f H β z Γ & 5 Ñ 6 M 9 g ω θ π 7 υ 1 S 8 ! 2 ^ Y X à ô # ̈ P @ ^ ~ + L ( [ U ) ≠ R @ h 0 _ T j W J k { } e , ] p < > . ? / : | Â I ë O q G " ! z δ 2 @ Å μ 7 r Î ç Ω λ 9 K 6 ë V 1 Ô H ¤ α z Φ 3 ê G g π T Σ # 8 h Γ υ Ξ 4 ! 5 ^ $ õ ­ D ν θ y Δ £ S | 0 + L b Æ _ M [ ) =́ N * R @ f T j W J k { } Ë , ] : | Â ï Q q Z " υ ç S Φ E μ λ θ Ω h π K £ Ξ a Δ i 2 Ž Y R n 9 Å β õ W 7 $ ­ Γ f̂ X̂ 3 Σ ê 1 γ ô δ ̈ ̄ 8 T Ĵ Ü Ï Δ Ļ m § ψ 0 Ĥ 4 ̧ Π k 6 V ( 5 * ̀ ≠ ρ ̧ Ğ % Ý Κ Ψ ď α ς q ¤ æ ; # ® o @ ! ž Ν̃ Q̃ ý 1 p 7 _ ø § ø Õ ζ ̌ × ^ ω ̄ 6 α 8 @ ̨ £ Đ Ε ç Ĵ ≠ ê 2 Ž t [ ́ Ĵ E J b́ a 2 $ ̧ Ο ν Ž Ω Ļ Y £ 0 y Λ ̧ ( ̧ χ € Γ ̌ Ή æ £ b 9 Ñ ã 3 f ́ § v̌ Ï m β Ç t Δ Å g # Δ I ÿ É Ρ õ 3 Ο ς I Ω Σ ( ̧ γ & ̌ Œ ̈ ̧ c U z ̇ ^ Q X x ̧ ̆ ŵ | φ ̂ T b Τ ž η ̧ ̌ Ť 1 p Κ Ύ - ̧ l 9 [ ̧ 9 x ̌ Ź Y 9 x̂ b 2 t ̧ H 7 Y l Ö μ̀ u Θ Ν 9 ̧ Ñ g I λ D 8́ a 0 - 1 X̌ _ I ž δ 0 F 2 à k Ω ] ̌ ̧ Η ̂ ̧ æ Ε Η ̂ Π 9 ; ̧ x ε̂ + ̌ F ŵ ̄ å ́ Ţ ̄ R Z u θ X̂ ď W £ ́ S x̂ e I ý ë p ξ Á N 6 V χ ̧ ̌ Ľ _ Q̃ Ç ̌ Ĵ Ļ Χ ̄ a̧ ̄ ψ ř d Í y τ Æ ε̌ m ̧ ] ï ® d 4 ú Ł ́ 7 ̧ Τ ̧ 5 ̧ Š f X 2̌ ͂ Ν ̧ Α ̧ Γ 7 r Ê H ̌ w ε ś Θ ̌ h ̧ b Ù P̀ Ĵ Π ň 1 ̧ ͅ H # ́ ^ ̌ Ŵ λ ͂ μ Ļ C k ̧ q̌ Ζ ́ ņ ̄ ƒ ÿ o Δ @ q μ t B 7 i λ K c € r Ψ õ C Φ V 4 D * 3 E α Σ f H β z Γ & 5 Ñ 6 M 9 g ω θ π 7 υ 1 S 8 ! 2 ^ Y X à ô # ̈ P @ ^ ~ + L ( [ U ) ≠ R @ h 0 _ T j W J k { } e , ] p < > . ? / : | Â I ë O q G " ! z δ 2 @ Å μ 7 r Î ç Ω λ 9 K 6 ë V 1 Ô H ¤ α z Φ 3 ê G g π T Σ # 8 h Γ υ Ξ 4 ! 5 ^ $ õ ­ D ν θ y Δ
  `,
    `
rt
struct group_info init_groups = { .usage = ATOMIC_INIT(2) }; struct group_info *groups_alloc(int gidsetsize){ struct group_info *group_info; int nblocks; int i;
 nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK; /* Make sure we always allocate at least one indirect block pointer */ nblocks = nblocks ? : 1; group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER); if (!group_info) return NULL; group_info->ngroups = gidsetsize; group_info->nblocks = nblocks; atomic_set(&group_info->usage, 1); if (gidsetsize <= NGROUPS_SMALL) group_info->blocks[0] = group_info->small_block; else {
 for (i = 0; i < nblocks; i++) { gid_t *b; b = (void *)__get_free_page(GFP_USER); if (!b)
 goto out_undo_partial_alloc; group_info->blocks[i] = b; }
 }
 return group_info; out_undo_partial_alloc: while (--i >= 0) { free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); return NULL; }
 EXPORT_SYMBOL(groups_alloc); void groups_free(struct group_info *group_info) {
 if (group_info->blocks[0] != group_info->small_block) { int i;
 for (i = 0; i < group_info->nblocks; i++) free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); }
 EXPORT_SYMBOL(groups_free); /* export the group_info to a user-space array */ static int groups_to_user(gid_t __user *grouplist, const struct group_info *group_info) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_to_user(grouplist, group_info->blocks[i], len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* fill a group_info from a user-space array - it must be allocated already */ static int groups_from_user(struct group_info *group_info, gid_t __user *grouplist) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_from_user(group_info->blocks[i], grouplist, len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* a simple Shell sort */ static void groups_sort(struct group_info *group_info) {
 int base, max, stride; int gidsetsize = group_info->ngroups; for (stride = 1; stride < gidsetsize; stride = 3 * stride + 1) ; /* nothing */ stride /= 3; while (stride) { max = gidsetsize - stride; for (base = 0; base < max; base++) { int left = base; int right = left + stride; gid_t tmp = GROUP_AT(group_info, right); while (left >= 0 && GROUP_AT(group_info, left) > tmp) { GROUP_AT(group_info, right) = GROUP_AT(group_info, left); right = left; left -= stride; }
 GROUP_AT(group_info, right) = tmp; }
 stride /= 3; }
 }
 /* a simple bsearch */ int groups_search(const struct group_info *group_info, gid_t grp) {
 unsigned int left, right; if (!group_info) return 0; left = 0; right = group_info->ngroups; while (left < right) { unsigned int mid = left + (right - left)/2; if (grp > GROUP_AT(group_info, mid)) left = mid + 1; else if (grp < GROUP_AT(group_info, mid)) right = mid; else
 return 1; }
 return 0; }
 /**
 * set_groups - Change a group subscription in a set of credentials * @new: The newly prepared set of credentials to alter * @group_info: The group list to install *
 * Validate a group subscription and, if valid, insert it into a set * of credentials.
 */
 int set_groups(struct cred *new, struct group_info *group_info) {
 put_group_info(new->group_info); groups_sort(group_info); get_group_info(group_info); new->group_info = group_info; return 0; }
 EXPORT_SYMBOL(set_groups); /**
 * set_current_groups - Change current's group subscription * @group_info: The group list to impose *
 * Validate a group subscription and, if valid, impose it upon current's task * security record.
 */
 int set_current_groups(struct group_info *group_info) {
 struct cred *new; int ret;
 new = prepare_creds(); if (!new) return -ENOMEM; ret = set_groups(new, group_info); if (ret < 0) { abort_creds(new); return ret; }
 return commit_creds(new); }
 EXPORT_SYMBOL(set_current_groups); SYSCALL_DEFINE2(getgroups, int, gidsetsize, gid_t __user *, grouplist) {
 const struct cred *cred = current_cred(); int i;
 if (gidsetsize < 0) return -EINVAL; /* no need to grab task_lock here; it cannot change */ i = cred->group_info->ngroups; if (gidsetsize) { if (i > gidsetsize) { i = -EINVAL; goto out; }
 if (groups_to_user(grouplist, cred->group_info)) { i = -EFAULT; goto out; }
 }
 out:
 return i; }
 /*
 *	SMP: Our groups are copy-on-write. We can set them safely *	without another task interfering.
 */
 SYSCALL_DEFINE2(setgroups, int, gidsetsize, gid_t __user *, grouplist) {
 struct group_info *group_info; int retval; if (!nsown_capable(CAP_SETGID)) return -EPERM; if ((unsigned)gidsetsize > NGROUPS_MAX) return -EINVAL; group_info = groups_alloc(gidsetsize); if (!group_info) return -ENOMEM; retval = groups_from_user(group_info, grouplist); if (retval) { put_group_info(group_info); return retval; }
 retval = set_current_groups(group_info); put_group_info(group_info); return retval; }
 /*
 * Check whether we're fsgid/egid or in the supplemental group..
 */
 int in_group_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->fsgid) retval = groups_search(cred->group_info, grp); return retval; }
 EXPORT_SYMBOL(in_group_p); int in_egroup_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->egid) retval = groups_search(cred->group_info, grp); return retval; }
  `,
    `
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
  `,
    `
?
struct group_info init_groups = { .usage = ATOMIC_INIT(2) }; struct group_info *groups_alloc(int gidsetsize){ struct group_info *group_info; int nblocks; int i;
 nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK; /* Make sure we always allocate at least one indirect block pointer */ nblocks = nblocks ? : 1; group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER); if (!group_info) return NULL; group_info->ngroups = gidsetsize; group_info->nblocks = nblocks; atomic_set(&group_info->usage, 1); if (gidsetsize <= NGROUPS_SMALL) group_info->blocks[0] = group_info->small_block; else {
 for (i = 0; i < nblocks; i++) { gid_t *b; b = (void *)__get_free_page(GFP_USER); if (!b)
 goto out_undo_partial_alloc; group_info->blocks[i] = b; }
 }
 return group_info; out_undo_partial_alloc: while (--i >= 0) { free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); return NULL; }
 EXPORT_SYMBOL(groups_alloc); void groups_free(struct group_info *group_info) {
 if (group_info->blocks[0] != group_info->small_block) { int i;
 for (i = 0; i < group_info->nblocks; i++) free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); }
 EXPORT_SYMBOL(groups_free); /* export the group_info to a user-space array */ static int groups_to_user(gid_t __user *grouplist, const struct group_info *group_info) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_to_user(grouplist, group_info->blocks[i], len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* fill a group_info from a user-space array - it must be allocated already */ static int groups_from_user(struct group_info *group_info, gid_t __user *grouplist) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_from_user(group_info->blocks[i], grouplist, len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* a simple Shell sort */ static void groups_sort(struct group_info *group_info) {
 int base, max, stride; int gidsetsize = group_info->ngroups; for (stride = 1; stride < gidsetsize; stride = 3 * stride + 1) ; /* nothing */ stride /= 3; while (stride) { max = gidsetsize - stride; for (base = 0; base < max; base++) { int left = base; int right = left + stride; gid_t tmp = GROUP_AT(group_info, right); while (left >= 0 && GROUP_AT(group_info, left) > tmp) { GROUP_AT(group_info, right) = GROUP_AT(group_info, left); right = left; left -= stride; }
 GROUP_AT(group_info, right) = tmp; }
 stride /= 3; }
 }
 /* a simple bsearch */ int groups_search(const struct group_info *group_info, gid_t grp) {
 unsigned int left, right; if (!group_info) return 0; left = 0; right = group_info->ngroups; while (left < right) { unsigned int mid = left + (right - left)/2; if (grp > GROUP_AT(group_info, mid)) left = mid + 1; else if (grp < GROUP_AT(group_info, mid)) right = mid; else
 return 1; }
 return 0; }
 /**
 * set_groups - Change a group subscription in a set of credentials * @new: The newly prepared set of credentials to alter * @group_info: The group list to install *
 * Validate a group subscription and, if valid, insert it into a set * of credentials.
 */
 int set_groups(struct cred *new, struct group_info *group_info) {
 put_group_info(new->group_info); groups_sort(group_info); get_group_info(group_info); new->group_info = group_info; return 0; }
 EXPORT_SYMBOL(set_groups); /**
 * set_current_groups - Change current's group subscription * @group_info: The group list to impose *
 * Validate a group subscription and, if valid, impose it upon current's task * security record.
 */
 int set_current_groups(struct group_info *group_info) {
 struct cred *new; int ret;
 new = prepare_creds(); if (!new) return -ENOMEM; ret = set_groups(new, group_info); if (ret < 0) { abort_creds(new); return ret; }
 return commit_creds(new); }
 EXPORT_SYMBOL(set_current_groups); SYSCALL_DEFINE2(getgroups, int, gidsetsize, gid_t __user *, grouplist) {
 const struct cred *cred = current_cred(); int i;
 if (gidsetsize < 0) return -EINVAL; /* no need to grab task_lock here; it cannot change */ i = cred->group_info->ngroups; if (gidsetsize) { if (i > gidsetsize) { i = -EINVAL; goto out; }
 if (groups_to_user(grouplist, cred->group_info)) { i = -EFAULT; goto out; }
 }
 out:
 return i; }
 /*
 *	SMP: Our groups are copy-on-write. We can set them safely *	without another task interfering.
 */
 SYSCALL_DEFINE2(setgroups, int, gidsetsize, gid_t __user *, grouplist) {
 struct group_info *group_info; int retval; if (!nsown_capable(CAP_SETGID)) return -EPERM; if ((unsigned)gidsetsize > NGROUPS_MAX) return -EINVAL; group_info = groups_alloc(gidsetsize); if (!group_info) return -ENOMEM; retval = groups_from_user(group_info, grouplist); if (retval) { put_group_info(group_info); return retval; }
 retval = set_current_groups(group_info); put_group_info(group_info); return retval; }
 /*
 * Check whether we're fsgid/egid or in the supplemental group..
 */
 int in_group_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->fsgid) retval = groups_search(cred->group_info, grp); return retval; }
 EXPORT_SYMBOL(in_group_p); int in_egroup_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->egid) retval = groups_search(cred->group_info, grp); return retval; }
  `,
    `
bl
struct group_info init_groups = { .usage = ATOMIC_INIT(2) }; struct group_info *groups_alloc(int gidsetsize){ struct group_info *group_info; int nblocks; int i;
 nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK; /* Make sure we always allocate at least one indirect block pointer */ nblocks = nblocks ? : 1; group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER); if (!group_info) return NULL; group_info->ngroups = gidsetsize; group_info->nblocks = nblocks; atomic_set(&group_info->usage, 1); if (gidsetsize <= NGROUPS_SMALL) group_info->blocks[0] = group_info->small_block; else {
 for (i = 0; i < nblocks; i++) { gid_t *b; b = (void *)__get_free_page(GFP_USER); if (!b)
 goto out_undo_partial_alloc; group_info->blocks[i] = b; }
 }
 return group_info; out_undo_partial_alloc: while (--i >= 0) { free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); return NULL; }
 EXPORT_SYMBOL(groups_alloc); void groups_free(struct group_info *group_info) {
 if (group_info->blocks[0] != group_info->small_block) { int i;
 for (i = 0; i < group_info->nblocks; i++) free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); }
 EXPORT_SYMBOL(groups_free); /* export the group_info to a user-space array */ static int groups_to_user(gid_t __user *grouplist, const struct group_info *group_info) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_to_user(grouplist, group_info->blocks[i], len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* fill a group_info from a user-space array - it must be allocated already */ static int groups_from_user(struct group_info *group_info, gid_t __user *grouplist) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_from_user(group_info->blocks[i], grouplist, len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* a simple Shell sort */ static void groups_sort(struct group_info *group_info) {
 int base, max, stride; int gidsetsize = group_info->ngroups; for (stride = 1; stride < gidsetsize; stride = 3 * stride + 1) ; /* nothing */ stride /= 3; while (stride) { max = gidsetsize - stride; for (base = 0; base < max; base++) { int left = base; int right = left + stride; gid_t tmp = GROUP_AT(group_info, right); while (left >= 0 && GROUP_AT(group_info, left) > tmp) { GROUP_AT(group_info, right) = GROUP_AT(group_info, left); right = left; left -= stride; }
 GROUP_AT(group_info, right) = tmp; }
 stride /= 3; }
 }
 /* a simple bsearch */ int groups_search(const struct group_info *group_info, gid_t grp) {
 unsigned int left, right; if (!group_info) return 0; left = 0; right = group_info->ngroups; while (left < right) { unsigned int mid = left + (right - left)/2; if (grp > GROUP_AT(group_info, mid)) left = mid + 1; else if (grp < GROUP_AT(group_info, mid)) right = mid; else
 return 1; }
 return 0; }
 /**
 * set_groups - Change a group subscription in a set of credentials * @new: The newly prepared set of credentials to alter * @group_info: The group list to install *
 * Validate a group subscription and, if valid, insert it into a set * of credentials.
 */
 int set_groups(struct cred *new, struct group_info *group_info) {
 put_group_info(new->group_info); groups_sort(group_info); get_group_info(group_info); new->group_info = group_info; return 0; }
 EXPORT_SYMBOL(set_groups); /**
 * set_current_groups - Change current's group subscription * @group_info: The group list to impose *
 * Validate a group subscription and, if valid, impose it upon current's task * security record.
 */
 int set_current_groups(struct group_info *group_info) {
 struct cred *new; int ret;
 new = prepare_creds(); if (!new) return -ENOMEM; ret = set_groups(new, group_info); if (ret < 0) { abort_creds(new); return ret; }
 return commit_creds(new); }
 EXPORT_SYMBOL(set_current_groups); SYSCALL_DEFINE2(getgroups, int, gidsetsize, gid_t __user *, grouplist) {
 const struct cred *cred = current_cred(); int i;
 if (gidsetsize < 0) return -EINVAL; /* no need to grab task_lock here; it cannot change */ i = cred->group_info->ngroups; if (gidsetsize) { if (i > gidsetsize) { i = -EINVAL; goto out; }
 if (groups_to_user(grouplist, cred->group_info)) { i = -EFAULT; goto out; }
 }
 out:
 return i; }
 /*
 *	SMP: Our groups are copy-on-write. We can set them safely *	without another task interfering.
 */
 SYSCALL_DEFINE2(setgroups, int, gidsetsize, gid_t __user *, grouplist) {
 struct group_info *group_info; int retval; if (!nsown_capable(CAP_SETGID)) return -EPERM; if ((unsigned)gidsetsize > NGROUPS_MAX) return -EINVAL; group_info = groups_alloc(gidsetsize); if (!group_info) return -ENOMEM; retval = groups_from_user(group_info, grouplist); if (retval) { put_group_info(group_info); return retval; }
 retval = set_current_groups(group_info); put_group_info(group_info); return retval; }
 /*
 * Check whether we're fsgid/egid or in the supplemental group..
 */
 int in_group_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->fsgid) retval = groups_search(cred->group_info, grp); return retval; }
 EXPORT_SYMBOL(in_group_p); int in_egroup_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->egid) retval = groups_search(cred->group_info, grp); return retval; }
  `,
    `
bm
struct group_info init_groups = { .usage = ATOMIC_INIT(2) }; struct group_info *groups_alloc(int gidsetsize){ struct group_info *group_info; int nblocks; int i;
 nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK; /* Make sure we always allocate at least one indirect block pointer */ nblocks = nblocks ? : 1; group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER); if (!group_info) return NULL; group_info->ngroups = gidsetsize; group_info->nblocks = nblocks; atomic_set(&group_info->usage, 1); if (gidsetsize <= NGROUPS_SMALL) group_info->blocks[0] = group_info->small_block; else {
 for (i = 0; i < nblocks; i++) { gid_t *b; b = (void *)__get_free_page(GFP_USER); if (!b)
 goto out_undo_partial_alloc; group_info->blocks[i] = b; }
 }
 return group_info; out_undo_partial_alloc: while (--i >= 0) { free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); return NULL; }
 EXPORT_SYMBOL(groups_alloc); void groups_free(struct group_info *group_info) {
 if (group_info->blocks[0] != group_info->small_block) { int i;
 for (i = 0; i < group_info->nblocks; i++) free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); }
 EXPORT_SYMBOL(groups_free); /* export the group_info to a user-space array */ static int groups_to_user(gid_t __user *grouplist, const struct group_info *group_info) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_to_user(grouplist, group_info->blocks[i], len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* fill a group_info from a user-space array - it must be allocated already */ static int groups_from_user(struct group_info *group_info, gid_t __user *grouplist) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_from_user(group_info->blocks[i], grouplist, len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* a simple Shell sort */ static void groups_sort(struct group_info *group_info) {
 int base, max, stride; int gidsetsize = group_info->ngroups; for (stride = 1; stride < gidsetsize; stride = 3 * stride + 1) ; /* nothing */ stride /= 3; while (stride) { max = gidsetsize - stride; for (base = 0; base < max; base++) { int left = base; int right = left + stride; gid_t tmp = GROUP_AT(group_info, right); while (left >= 0 && GROUP_AT(group_info, left) > tmp) { GROUP_AT(group_info, right) = GROUP_AT(group_info, left); right = left; left -= stride; }
 GROUP_AT(group_info, right) = tmp; }
 stride /= 3; }
 }
 /* a simple bsearch */ int groups_search(const struct group_info *group_info, gid_t grp) {
 unsigned int left, right; if (!group_info) return 0; left = 0; right = group_info->ngroups; while (left < right) { unsigned int mid = left + (right - left)/2; if (grp > GROUP_AT(group_info, mid)) left = mid + 1; else if (grp < GROUP_AT(group_info, mid)) right = mid; else
 return 1; }
 return 0; }
 /**
 * set_groups - Change a group subscription in a set of credentials * @new: The newly prepared set of credentials to alter * @group_info: The group list to install *
 * Validate a group subscription and, if valid, insert it into a set * of credentials.
 */
 int set_groups(struct cred *new, struct group_info *group_info) {
 put_group_info(new->group_info); groups_sort(group_info); get_group_info(group_info); new->group_info = group_info; return 0; }
 EXPORT_SYMBOL(set_groups); /**
 * set_current_groups - Change current's group subscription * @group_info: The group list to impose *
 * Validate a group subscription and, if valid, impose it upon current's task * security record.
 */
 int set_current_groups(struct group_info *group_info) {
 struct cred *new; int ret;
 new = prepare_creds(); if (!new) return -ENOMEM; ret = set_groups(new, group_info); if (ret < 0) { abort_creds(new); return ret; }
 return commit_creds(new); }
 EXPORT_SYMBOL(set_current_groups); SYSCALL_DEFINE2(getgroups, int, gidsetsize, gid_t __user *, grouplist) {
 const struct cred *cred = current_cred(); int i;
 if (gidsetsize < 0) return -EINVAL; /* no need to grab task_lock here; it cannot change */ i = cred->group_info->ngroups; if (gidsetsize) { if (i > gidsetsize) { i = -EINVAL; goto out; }
 if (groups_to_user(grouplist, cred->group_info)) { i = -EFAULT; goto out; }
 }
 out:
 return i; }
 /*
 *	SMP: Our groups are copy-on-write. We can set them safely *	without another task interfering.
 */
 SYSCALL_DEFINE2(setgroups, int, gidsetsize, gid_t __user *, grouplist) {
 struct group_info *group_info; int retval; if (!nsown_capable(CAP_SETGID)) return -EPERM; if ((unsigned)gidsetsize > NGROUPS_MAX) return -EINVAL; group_info = groups_alloc(gidsetsize); if (!group_info) return -ENOMEM; retval = groups_from_user(group_info, grouplist); if (retval) { put_group_info(group_info); return retval; }
 retval = set_current_groups(group_info); put_group_info(group_info); return retval; }
 /*
 * Check whether we're fsgid/egid or in the supplemental group..
 */
 int in_group_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->fsgid) retval = groups_search(cred->group_info, grp); return retval; }
 EXPORT_SYMBOL(in_group_p); int in_egroup_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->egid) retval = groups_search(cred->group_info, grp); return retval; }
  `,
    `
??
struct group_info init_groups = { .usage = ATOMIC_INIT(2) }; struct group_info *groups_alloc(int gidsetsize){ struct group_info *group_info; int nblocks; int i;
 nblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK; /* Make sure we always allocate at least one indirect block pointer */ nblocks = nblocks ? : 1; group_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER); if (!group_info) return NULL; group_info->ngroups = gidsetsize; group_info->nblocks = nblocks; atomic_set(&group_info->usage, 1); if (gidsetsize <= NGROUPS_SMALL) group_info->blocks[0] = group_info->small_block; else {
 for (i = 0; i < nblocks; i++) { gid_t *b; b = (void *)__get_free_page(GFP_USER); if (!b)
 goto out_undo_partial_alloc; group_info->blocks[i] = b; }
 }
 return group_info; out_undo_partial_alloc: while (--i >= 0) { free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); return NULL; }
 EXPORT_SYMBOL(groups_alloc); void groups_free(struct group_info *group_info) {
 if (group_info->blocks[0] != group_info->small_block) { int i;
 for (i = 0; i < group_info->nblocks; i++) free_page((unsigned long)group_info->blocks[i]); }
 kfree(group_info); }
 EXPORT_SYMBOL(groups_free); /* export the group_info to a user-space array */ static int groups_to_user(gid_t __user *grouplist, const struct group_info *group_info) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_to_user(grouplist, group_info->blocks[i], len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* fill a group_info from a user-space array - it must be allocated already */ static int groups_from_user(struct group_info *group_info, gid_t __user *grouplist) {
 int i;
 unsigned int count = group_info->ngroups; for (i = 0; i < group_info->nblocks; i++) { unsigned int cp_count = min(NGROUPS_PER_BLOCK, count); unsigned int len = cp_count * sizeof(*grouplist); if (copy_from_user(group_info->blocks[i], grouplist, len)) return -EFAULT; grouplist += NGROUPS_PER_BLOCK; count -= cp_count; }
 return 0; }
 /* a simple Shell sort */ static void groups_sort(struct group_info *group_info) {
 int base, max, stride; int gidsetsize = group_info->ngroups; for (stride = 1; stride < gidsetsize; stride = 3 * stride + 1) ; /* nothing */ stride /= 3; while (stride) { max = gidsetsize - stride; for (base = 0; base < max; base++) { int left = base; int right = left + stride; gid_t tmp = GROUP_AT(group_info, right); while (left >= 0 && GROUP_AT(group_info, left) > tmp) { GROUP_AT(group_info, right) = GROUP_AT(group_info, left); right = left; left -= stride; }
 GROUP_AT(group_info, right) = tmp; }
 stride /= 3; }
 }
 /* a simple bsearch */ int groups_search(const struct group_info *group_info, gid_t grp) {
 unsigned int left, right; if (!group_info) return 0; left = 0; right = group_info->ngroups; while (left < right) { unsigned int mid = left + (right - left)/2; if (grp > GROUP_AT(group_info, mid)) left = mid + 1; else if (grp < GROUP_AT(group_info, mid)) right = mid; else
 return 1; }
 return 0; }
 /**
 * set_groups - Change a group subscription in a set of credentials * @new: The newly prepared set of credentials to alter * @group_info: The group list to install *
 * Validate a group subscription and, if valid, insert it into a set * of credentials.
 */
 int set_groups(struct cred *new, struct group_info *group_info) {
 put_group_info(new->group_info); groups_sort(group_info); get_group_info(group_info); new->group_info = group_info; return 0; }
 EXPORT_SYMBOL(set_groups); /**
 * set_current_groups - Change current's group subscription * @group_info: The group list to impose *
 * Validate a group subscription and, if valid, impose it upon current's task * security record.
 */
 int set_current_groups(struct group_info *group_info) {
 struct cred *new; int ret;
 new = prepare_creds(); if (!new) return -ENOMEM; ret = set_groups(new, group_info); if (ret < 0) { abort_creds(new); return ret; }
 return commit_creds(new); }
 EXPORT_SYMBOL(set_current_groups); SYSCALL_DEFINE2(getgroups, int, gidsetsize, gid_t __user *, grouplist) {
 const struct cred *cred = current_cred(); int i;
 if (gidsetsize < 0) return -EINVAL; /* no need to grab task_lock here; it cannot change */ i = cred->group_info->ngroups; if (gidsetsize) { if (i > gidsetsize) { i = -EINVAL; goto out; }
 if (groups_to_user(grouplist, cred->group_info)) { i = -EFAULT; goto out; }
 }
 out:
 return i; }
 /*
 *	SMP: Our groups are copy-on-write. We can set them safely *	without another task interfering.
 */
 SYSCALL_DEFINE2(setgroups, int, gidsetsize, gid_t __user *, grouplist) {
 struct group_info *group_info; int retval; if (!nsown_capable(CAP_SETGID)) return -EPERM; if ((unsigned)gidsetsize > NGROUPS_MAX) return -EINVAL; group_info = groups_alloc(gidsetsize); if (!group_info) return -ENOMEM; retval = groups_from_user(group_info, grouplist); if (retval) { put_group_info(group_info); return retval; }
 retval = set_current_groups(group_info); put_group_info(group_info); return retval; }
 /*
 * Check whether we're fsgid/egid or in the supplemental group..
 */
 int in_group_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->fsgid) retval = groups_search(cred->group_info, grp); return retval; }
 EXPORT_SYMBOL(in_group_p); int in_egroup_p(gid_t grp) {
 const struct cred *cred = current_cred(); int retval = 1; if (grp != cred->egid) retval = groups_search(cred->group_info, grp); return retval; }
  `,
]
skcli.simcodeTargets = [
    document.getElementById("simcode0"),
    document.getElementById("simcode1"),
    document.getElementById("simcode2"),
    document.getElementById("simcode3"),
    document.getElementById("simcode4"),
    document.getElementById("simcode5"),
    document.getElementById("simcode6"),
    document.getElementById("simcode7"),
    document.getElementById("simcode8"),
    document.getElementById("simcode9"),
    document.getElementById("simcode10"),
    document.getElementById("simcode11"),
    document.getElementById("simcode12")
]
skcli.writeSimcode = function () {
    console.log('writing simcode')
    // simcode0exe(simcode0, 0)
    simcode1exe(skcli.simcodes[0], 0)
    simcode1exe(skcli.simcodes[1], 0)
    simcode2exe(skcli.simcodes[2], 0)
    simcode3exe(skcli.simcodes[3], 0)
    simcode4exe(skcli.simcodes[4], 0)
    simcode5exe(skcli.simcodes[5], 0)
    simcode6exe(skcli.simcodes[6], 0)
    simcode7exe(skcli.simcodes[7], 0)
    simcode8exe(skcli.simcodes[8], 0)
    simcode9exe(skcli.simcodes[9], 0)
    simcode10exe(skcli.simcodes[10], 0)
    simcode11exe(skcli.simcodes[11], 0)
    simcode12exe(skcli.simcodes[12], 0)
}
skcli.staggerWriteSimcode = function () {

    // stagger-write simcode
    setTimeout(function () {
        simcode0exe(skcli.simcodes[0], 0)
        document.querySelector('.sk-cli__middle__center').style.justifyContent = "flex-start"
        document.querySelector('.sk-cli__middle__center').style.flexDirection = "column-reverse"
        document.querySelector('.sk-cli__scroll__top .x-smile').style.display = "block"
    }, 4250)
    setTimeout(function () {
        simcode1exe(skcli.simcodes[1], 0)
    }, 0)
    setTimeout(function () {
        simcode2exe(skcli.simcodes[2], 0)
    }, 50)
    setTimeout(function () {
        simcode3exe(skcli.simcodes[3], 0)
    }, 100)

    // setTimeout(function(){
    //   simcode4exe(skcli.simcodes[4], 0)
    // }, 450)
    setTimeout(function () {
        simcode5exe(skcli.simcodes[5], 0)
    }, 500)
    setTimeout(function () {
        simcode6exe(skcli.simcodes[6], 0)
    }, 550)

    setTimeout(function () {
        simcode7exe(skcli.simcodes[7], 0)
    }, 150)
    setTimeout(function () {
        simcode8exe(skcli.simcodes[8], 0)
    }, 200)
    //   setTimeout(function(){
    //   simcode9exe(skcli.simcodes[9], 0)
    // }, 250)

    setTimeout(function () {
        simcode10exe(skcli.simcodes[10], 0)
    }, 300)
    setTimeout(function () {
        simcode11exe(skcli.simcodes[11], 0)
    }, 350)
    setTimeout(function () {
        simcode12exe(skcli.simcodes[12], 0)
    }, 400)

}
skcli.clearSimcode = function () {
    for (i = 0; i < skcli.simcodeTargets.length; i++) {
        if (skcli.simcodeTargets[i]) {
            skcli.simcodeTargets[i].innerHTML = ''
        }
    }
}
skcli.cast = function () {
    // stagger open panels and stagger write simcode
    skcli.staggerOpenPanels()
    skcli.staggerWriteSimcode()
    // hide cast box
    document.querySelector('#castbox').style.display = 'none'
    // show cast in progress
    document.querySelector('#casting').style.display = 'flex'
    // document.querySelector('.sk-cli__middle__center').style.justifyContent = 'flex-start'
}
skcli.init = function () {
    console.log('skcli init')

    // set panel states
    if (skcli.tPanelOpen) {
        document.querySelector('.sk-cli__top').classList.add('sk-cli__top--expanded')
    } else {
        document.querySelector('.sk-cli__top').classList.add('sk-cli__top--collapsed')
    }
    if (skcli.bPanelOpen) {
        document.querySelector('.sk-cli__bottom').classList.add('sk-cli__bottom--expanded')
    } else {
        document.querySelector('.sk-cli__bottom').classList.add('sk-cli__bottom--collapsed')
    }
    if (skcli.lPanelOpen) {
        document.querySelector('.sk-cli__middle__left').classList.add('sk-cli__middle__left--expanded')
    } else {
        document.querySelector('.sk-cli__middle__left').classList.add('sk-cli__middle__left--collapsed')
    }
    if (skcli.rPanelOpen) {
        document.querySelector('.sk-cli__middle__right').classList.add('sk-cli__middle__right--expanded')
    } else {
        document.querySelector('.sk-cli__middle__right').classList.add('sk-cli__middle__right--collapsed')
    }
    // end set panel states

    // setTimeout(function(){
    //   // open top
    //   skcli.cast()
    // }, 1000)
}

// simcode write functions
function simcode0exe(text, index) {
    if (index < text.length) {
        skcli.simcodeTargets[0].innerHTML += text.charAt(index)
        index++
        setTimeout(() => simcode0exe(text, index), 1)
    }
}
function simcode1exe(text, index) {
    if (index < text.length) {
        skcli.simcodeTargets[1].innerHTML += text.charAt(index)
        index++
        setTimeout(() => simcode1exe(text, index), 1)
    }
}
function simcode2exe(text, index) {
    if (index < text.length) {
        skcli.simcodeTargets[2].innerHTML += text.charAt(index)
        index++
        setTimeout(() => simcode2exe(text, index), 1)
    }
}
function simcode3exe(text, index) {
    if (index < text.length) {
        skcli.simcodeTargets[3].innerHTML += text.charAt(index)
        index++
        setTimeout(() => simcode3exe(text, index), 1)
    }
}
// function simcode4exe(text, index){
//   if (index < text.length){
//     skcli.simcodeTargets[4].innerHTML += text.charAt(index)
//     index++
//     setTimeout(() => simcode4exe(text, index), 1)
//   }
// }
function simcode5exe(text, index) {
    if (index < text.length) {
        skcli.simcodeTargets[5].innerHTML += text.charAt(index)
        index++
        setTimeout(() => simcode5exe(text, index), 1)
    }
}
function simcode6exe(text, index) {
    if (index < text.length) {
        skcli.simcodeTargets[6].innerHTML += text.charAt(index)
        index++
        setTimeout(() => simcode6exe(text, index), 1)
    }
}
function simcode7exe(text, index) {
    if (index < text.length) {
        skcli.simcodeTargets[7].innerHTML += text.charAt(index)
        index++
        setTimeout(() => simcode7exe(text, index), 1)
    }
}
function simcode8exe(text, index) {
    if (index < text.length) {
        skcli.simcodeTargets[8].innerHTML += text.charAt(index)
        index++
        setTimeout(() => simcode8exe(text, index), 1)
    }
}
// function simcode9exe(text, index){
//   if (index < text.length){
//     skcli.simcodeTargets[9].innerHTML += text.charAt(index)
//     index++
//     setTimeout(() => simcode9exe(text, index), 1)
//   }
// }
function simcode10exe(text, index) {
    if (index < text.length) {
        skcli.simcodeTargets[10].innerHTML += text.charAt(index)
        index++
        setTimeout(() => simcode10exe(text, index), 1)
    }
}
function simcode11exe(text, index) {
    if (index < text.length) {
        skcli.simcodeTargets[11].innerHTML += text.charAt(index)
        index++
        setTimeout(() => simcode11exe(text, index), 1)
    }
}
function simcode12exe(text, index) {
    if (index < text.length) {
        skcli.simcodeTargets[12].innerHTML += text.charAt(index)
        index++
        setTimeout(() => simcode12exe(text, index), 1)
    }
}
// end simcode write functions

// loading cube
const loadingcube = {}
loadingcube.isPlaying = true
loadingcube.play = function () {

    // Function to add a random class
    function addRandomClass() {
        const classes = ['show-bm', 'show-tp', 'show-lt', 'show-bk', 'show-rt', 'show-ft']
        const randomClass = classes[Math.floor(Math.random() * classes.length)]
        document.querySelector('.loadingcube').classList.add(randomClass)
    }

    // Function to remove the added class
    function removeClass() {
        document.querySelector('.loadingcube').classList.remove('show-bm', 'show-tp', 'show-lt', 'show-bk', 'show-rt', 'show-ft')
        // document.querySelector('.loadingcube').classList.add('spin')
    }

    // Function to perform the actions in sequence
    function performActions() {
        addRandomClass()
        setTimeout(removeClass, 1500)
        setTimeout(performActions, 3000)
    }

    // Initial call to start the process
    performActions()


    // Function to slide
    function performActions() {
        addRandomClass()
        setTimeout(removeClass, 1500)
        setTimeout(performActions, 3000)
    }


    // Get all cells
    var lcpadcell = document.querySelectorAll('.lcpad > .lcpad-row > div')

    // Function to check if any cell has the class 'set'
    function lcHasSetCells() {
        for (var i = 0; i < lcpadcell.length; i++) {
            if (!lcpadcell[i].classList.contains('set')) {
                console.log('has .set cells')
                return false
            }
        }
        console.log('no .set cells')
        return true
    }

    // Function to add the class 'set' iteratively
    function addClassIteratively() {
        // If not all cells have the class 'set'
        if (!lcHasSetCells()) {
            // Use setInterval to add the class at intervals
            var intervalId = setInterval(function () {
                // Generate a random index
                var randomIndex = Math.floor(Math.random() * lcpadcell.length)

                // If the random cell does not have the class 'set'
                if (!lcpadcell[randomIndex].classList.contains('set')) {
                    // Add the class 'set' to the random cell
                    lcpadcell[randomIndex].classList.add('set')
                }

                // Check if all cells have been processed
                if (lcHasSetCells()) {
                    // Clear the interval if all cells have the class 'set'
                    clearInterval(intervalId)
                }
            }, 100)
        }
    }

    // Start adding the class 'set'
    addClassIteratively()

}
loadingcube.play()
// end loading cube

// animated scroll
const loader = document.querySelector('#sk-cli__scroll__loader1');
const loader2 = document.querySelector('#sk-cli__scroll__loader2');
const firework = document.querySelector('#fireworks_body');
const navigationMenu = document.getElementById('navigation_menu');
// Hàm tạo hiệu ứng ẩn hiện (fade in/out)
let visible = true; // Trạng thái hiện tại: đang hiển thị

// top
setTimeout(function () {
    document.querySelector('#sk-cli__scroll__loader1').style.display = "block"
}, 2000)
setTimeout(function () {
    document.querySelector('#sk-cli__scroll__loader2').style.display = "block"
}, 3000)
setTimeout(function () {
    setInterval(() => {
        loader.style.opacity = visible ? '0' : '1'; // Ẩn hoặc hiện
        loader2.style.opacity = visible ? '0' : '1'; // Ẩn hoặc hiện
        visible = !visible;
    }, 300);
}, 4300)
setTimeout(() => {
    loader.style.display = 'none'; // Ẩn phần tử hoàn toàn
    loader2.style.display = 'none'; // Ẩn phần tử hoàn toàn
}, 6000);
setTimeout(() => {
    firework.style.display = 'flex';
}, 5300);
setTimeout(() => {
    firework.style.display = 'none';
}, 12000);
setTimeout(() => {
    navigationMenu.style.display = 'flex'; // Chuyển từ display: none thành display: flex
    setTimeout(() => {
        navigationMenu.classList.add('show'); // Thêm class 'show' để hiển thị #navigation_menu từ từ
    }, 100); // Thêm độ trễ nhẹ để hiệu ứng bắt đầu

    // Lấy tất cả các phần tử li bên trong .navigation
    const navigationItems = document.querySelectorAll('.navigation li');

    // Làm các mục trong danh sách từ từ xuất hiện
    navigationItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show'); // Hiển thị mục
        }, index * 500); // Đặt độ trễ tăng dần cho mỗi mục
    });
}, 12000);

// bottom
setTimeout(function () {
    document.querySelector('.sk-cli__scroll__bottom__message1').style.display = "block"
}, 2000)
setTimeout(function () {
    document.querySelector('.sk-cli__scroll__bottom__message1').style.display = "none"
    document.querySelector('.sk-cli__scroll__bottom__message2').style.display = "block"
}, 3050)
setTimeout(function () {
    document.querySelector('.sk-cli__scroll__bottom__message2').style.display = "none"
}, 4300)

// end animated scroll

skcli.init()
skcli.cast() //temp
// end spellkaster cli










// swarm
var width,
    height,
    container,
    canvas,
    ctx,
    points,
    target,
    animateHeader = true

container = document.getElementById('connecting-dots')
width = 600;
height = 600;
target = {
    x: width / 2,
    y: height / 2
};
canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
ctx = canvas.getContext('2d');

// turn off image aliasing
ctx.msImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

points = [];
for (var x = 0; x < width; x = x + width / 20) {
    for (var y = 0; y < height; y = y + height / 20) {
        var px = x + Math.random() * width / 100;
        var py = y + Math.random() * height / 100;
        var p = {
            x: px,
            originX: px,
            y: py,
            originY: py
        };
        points.push(p);
    }
}
for (var i = 0; i < points.length; i++) {
    var closest = [];
    var p1 = points[i];
    for (var j = 0; j < points.length; j++) {
        var p2 = points[j]
        if (!(p1 == p2)) {
            var placed = false;
            for (var k = 0; k < 5; k++) {
                if (!placed) {
                    if (closest[k] == undefined) {
                        closest[k] = p2;
                        placed = true;
                    }
                }
            }
            for (var k = 0; k < 5; k++) {
                if (!placed) {
                    if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                        closest[k] = p2;
                        placed = true;
                    }
                }
            }
        }
    }
    p1.closest = closest;
}
for (var i in points) {
    var c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(0,255,0,0.9)');
    points[i].circle = c;
}
function initAnimation() {
    animate();
    for (var i in points) {
        shiftPoint(points[i]);
    }
}
function animate() {
    if (animateHeader) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i in points) {
            // detect points in range
            if (Math.abs(getDistance(target, points[i])) < 4000) {
                points[i].active = 0.3;
                points[i].circle.active = 0.6;
            } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                points[i].active = 0.1;
                points[i].circle.active = 0.3;
            } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                points[i].active = 0.02;
                points[i].circle.active = 0.1;
            } else {
                points[i].active = 0;
                points[i].circle.active = 0;
            }
            drawLines(points[i]);
            points[i].circle.draw();
        }
    }
    requestAnimationFrame(animate);
}
function shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: function () {
            shiftPoint(p);
        }
    });
}
function drawLines(p) {
    if (!p.active) return;
    for (var i in p.closest) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = 'rgba(0,255,0,' + p.active + ')';
        ctx.stroke();
    }
}
function Circle(pos, rad, color) {
    var _this = this;
    (function () {
        _this.pos = pos || null;
        _this.radius = rad || null;
        _this.color = color || null;
    })();
    this.draw = function () {
        if (!_this.active) return;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(0,255,0,' + _this.active + ')';
        ctx.fill();
    };
}
function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}
initAnimation();
// end swarm