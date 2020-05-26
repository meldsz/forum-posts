import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import App from '../../src/App'

Vue.use(Vuetify)

const mockData = [
    {
        'id': 1,
        'location': 'San Francisco',
        'time': '1552657573',
        'author': 'Happy User',
        'text': 'Proper PDF conversion ensures that every element of your document remains just as you left it.'
    },
    {
        'id': 2,
        'location': 'San Francisco',
        'time': '1552571173',
        'author': 'Happy User',
        'text': 'The modern workplace is increasingly digital, and workflows are constantly evolving.'
    }]

const mockGroupedPosts = [
    {
        'author': 'Happy User',
        'id': 1,
        'location': 'San Francisco',
        'text': 'Proper PDF conversion ensures that every element of your document remains just as you left it.',
        'time': '1552657573',
        'weeks': 62,
    },
    {
        'author': 'Happy User',
        'id': 2,
        'location': 'San Francisco',
        'text': 'The modern workplace is increasingly digital, and workflows are constantly evolving.',
        'time': '1552571173',
        'weeks': 62,
    },
]

global.fetch = jest.fn().mockImplementation(() => ({
    json() {
        return mockData
    }
}))

describe('Component: Root', () => {
    const vuetify = new Vuetify({})

    const wrapper = shallowMount(App, { vuetify })
    const { vm } = wrapper
    describe('initial render', () => {
        it('should render the component', () => {
            expect(wrapper.html()).toContain('class="app"')
            expect(vm.groupByType).toBe('weeks')
        })
        it('should populate `postsList` correctly', () => {
            expect(vm.postsList).toEqual(mockData)
        })
        it('should group posts by week correctly', () => {
            const expectedGroupedPosts = [
                {
                    'name': '62',
                    'posts': mockGroupedPosts
                },
            ]
            expect(vm.groupByType).toBe('weeks')
            expect(vm.groupPosts).toEqual(expectedGroupedPosts)
        })
    })

    it('should format date correctly', () => {
        expect(vm.getFormattedDate('1090344471')).toBe('20 July, 2004 at 18:27')
        expect(vm.getFormattedDate('2090341451')).toBe('28 March, 2036 at 18:24')
    })

    it('should group posts by location correctly', () => {
        wrapper.setData({ groupByType: 'location' })
        const expectedGroupedPosts = [
            {
                'name': 'San Francisco',
                'posts': mockGroupedPosts
            },
        ]
        expect(vm.groupByType).toBe('location')
        expect(vm.groupPosts).toEqual(expectedGroupedPosts)
    })
    it('should group posts by author correctly', () => {
        wrapper.setData({ groupByType: 'author' })
        const expectedGroupedPosts = [
            {
                'name': 'Happy User',
                'posts': mockGroupedPosts
            },
        ]
        expect(vm.groupByType).toBe('author')
        expect(vm.groupPosts).toEqual(expectedGroupedPosts)
    })
    it('should display weeks correctly',()=>{
        expect(vm.displayWeeks(3)).toBe('3 weeks ago')
        expect(vm.displayWeeks(1)).toBe('1 week ago')
        expect(vm.displayWeeks(0)).toBe('This week')
    })
})